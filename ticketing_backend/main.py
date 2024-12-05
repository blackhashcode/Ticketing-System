from fastapi import FastAPI, HTTPException, Depends, Body
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from crud import create_user, get_user_by_email, create_event, update_event, delete_event, get_all_events, get_event_by_id, create_ticket
from models import User, Event, Ticket, UserRole, UserSignup, UserLogin # Make sure UserRole is imported from models
from fastapi.middleware.cors import CORSMiddleware
from supabase_client import supabase
from abc import ABC, abstractmethod
from functools import wraps

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development, specify frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Factory Pattern for creating Users based on role
class UserFactory:
    @staticmethod
    def create_user(email: str, username: str, password: str, role: UserRole) -> User:
        if role == UserRole.customer:
            return CustomerUser(email=email, username=username, hashed_password=password)
        elif role == UserRole.organizer:
            return OrganizerUser(email=email, username=username, hashed_password=password)
        else:
            raise ValueError("Invalid role")

# Base User Model
class User(BaseModel):
    id: int
    email: str
    username: str
    hashed_password: str
    role: UserRole

class CustomerUser(User):
    def __init__(self, email: str, username: str, hashed_password: str):
        super().__init__(email=email, username=username, hashed_password=hashed_password, role=UserRole.customer)

class OrganizerUser(User):
    def __init__(self, email: str, username: str, hashed_password: str):
        super().__init__(email=email, username=username, hashed_password=hashed_password, role=UserRole.organizer)

# Decorator Pattern for Role-based Authorization
def role_required(role: UserRole):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            user = kwargs.get('user')
            if user and user.role != role:
                raise HTTPException(status_code=403, detail=f"Only {role.value}s can perform this action")
            return await func(*args, **kwargs)
        return wrapper
    return decorator

# Strategy Pattern for Ticket Pricing
class TicketPricingStrategy(ABC):
    @abstractmethod
    def calculate_price(self, base_price: float) -> float:
        pass

class NormalTicketPricing(TicketPricingStrategy):
    def calculate_price(self, base_price: float) -> float:
        return base_price

class VIPTicketPricing(TicketPricingStrategy):
    def calculate_price(self, base_price: float) -> float:
        return base_price * 1.5

# Ticket Purchase with Strategy Pattern
@app.post("/purchase_ticket")
@role_required(UserRole.customer)
async def purchase_ticket(ticket: Ticket, user: User):
    # Retrieve event
    event = await get_event_by_id(ticket.event_id)
    if not event:
        raise HTTPException(status_code=400, detail="Event not found")
    
    # Check event capacity
    if event.total_capacity <= 0:
        raise HTTPException(status_code=400, detail="No capacity available")
    
    # Apply pricing strategy
    strategy = VIPTicketPricing() if ticket.ticket_type == 'VIP' else NormalTicketPricing()
    price = strategy.calculate_price(event.vip_price if ticket.ticket_type == 'VIP' else event.normal_price)

    # Create the ticket and update event capacity
    created_ticket = await create_ticket(ticket)
    updated_event = await update_event(ticket.event_id, {"total_capacity": event.total_capacity - 1})

    return {"message": "Ticket purchased successfully", "ticket": created_ticket, "price": price}

# User Registration (Signup)
@app.post("/signup")
async def signup(user: UserSignup):
    response = supabase.from_("users").insert({
        "username": user.username,
        "email": user.email,
        "role": user.role
    }).execute()

    if response.error:
        raise HTTPException(status_code=400, detail="Signup failed")

    return {"message": "Signup successful"}

# User Login
@app.post("/login")
async def login(user: UserLogin):
    stored_user = await get_user_by_email(user.email)
    if not stored_user:
        raise HTTPException(status_code=404, detail="User not found")

    login_response = supabase.auth.sign_in_with_password(email=user.email, password=user.password)
    if login_response.error:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    user_data = login_response.data
    return {"message": "Login successful", "role": user_data['role'], "username": user_data['username']}

# Event CRUD for Organizers
@app.post("/create_event")
@role_required(UserRole.organizer)
async def create_event_route(event: Event, user: User):
    created_event = await create_event(event)
    return {"message": "Event created successfully", "event": created_event}

@app.put("/update_event/{event_id}")
@role_required(UserRole.organizer)
async def update_event_route(event_id: int, event: Event, user: User):
    updated_event = await update_event(event_id, event)
    if updated_event:
        return {"message": "Event updated successfully", "event": updated_event}
    raise HTTPException(status_code=404, detail="Event not found")

@app.delete("/delete_event/{event_id}")
@role_required(UserRole.organizer)
async def delete_event_route(event_id: int, user: User):
    deleted_event = await delete_event(event_id)
    if deleted_event:
        return {"message": "Event deleted successfully"}
    raise HTTPException(status_code=404, detail="Event not found")

# Get All Events
@app.get("/events")
async def get_events():
    events = await get_all_events()
    return {"events": events}

# Get Event by ID
@app.get("/events/{event_id}")
async def get_event(event_id: int):
    event = await get_event_by_id(event_id)
    if event:
        return {"event": event}
    raise HTTPException(status_code=404, detail="Event not found")
