from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum
from abc import ABC, abstractmethod

# Enum for User Roles
class UserRole(str, Enum):
    customer = "customer"
    organizer = "organizer"

# Strategy Pattern for Ticket Pricing
class TicketPricingStrategy(ABC):
    @abstractmethod
    def calculate_price(self, base_price: float) -> float:
        pass

# VIP Ticket Pricing Strategy
class VIPTicketPricing(TicketPricingStrategy):
    def calculate_price(self, base_price: float) -> float:
        # Assuming VIP price is higher by 50%
        return base_price * 1.5

# Normal Ticket Pricing Strategy
class NormalTicketPricing(TicketPricingStrategy):
    def calculate_price(self, base_price: float) -> float:
        return base_price

# Factory Pattern for User Creation
class UserFactory:
    @staticmethod
    def create_user(email: EmailStr, username: str, password: str, role: UserRole) -> 'User':
        if role == UserRole.customer:
            return CustomerUser(email=email, username=username, password=password)
        elif role == UserRole.organizer:
            return OrganizerUser(email=email, username=username, password=password)
        else:
            raise ValueError("Invalid user role")

# Base User Model
class User(BaseModel):
    id: int
    email: EmailStr
    username: str
    hashed_password: str  # Store hashed password, never plain text
    role: UserRole  # user role: customer or organizer

    def get_role_name(self) -> str:
        return self.role.value

# Customer User Model (inherits from User)
class CustomerUser(User):
    def __init__(self, email: EmailStr, username: str, password: str):
        super().__init__(email=email, username=username, hashed_password=password, role=UserRole.customer)

# Organizer User Model (inherits from User)
class OrganizerUser(User):
    def __init__(self, email: EmailStr, username: str, password: str):
        super().__init__(email=email, username=username, hashed_password=password, role=UserRole.organizer)

# Event Model
class Event(BaseModel):
    title: str
    description: str
    date: str
    vip_price: float
    normal_price: float
    venue: str
    total_capacity: int

    def get_ticket_price(self, ticket_type: str) -> float:
        if ticket_type == "VIP":
            strategy = VIPTicketPricing()
        else:
            strategy = NormalTicketPricing()
        return strategy.calculate_price(self.vip_price if ticket_type == "VIP" else self.normal_price)

# Ticket Model
class Ticket(BaseModel):
    event_id: int
    user_id: int
    ticket_type: str  # 'VIP' or 'Normal'

# Signup Schema
class UserSignup(BaseModel):
    email: EmailStr
    username: str
    password: str
    role: UserRole  # "customer" or "organizer"

# Login Schema
class UserLogin(BaseModel):
    email: EmailStr
    password: str  # Plaintext password (for login purposes)
