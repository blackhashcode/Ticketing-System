from supabase_client import supabase
from models import User, Event, Ticket
from abc import ABC, abstractmethod

# Singleton Pattern for Supabase client
class SupabaseClientSingleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = supabase
        return cls._instance


# Factory Pattern to create User, Event, Ticket objects
class ModelFactory(ABC):
    @abstractmethod
    def create(self, data: dict):
        pass


class UserFactory(ModelFactory):
    def create(self, data: dict):
        # Create a User instance from provided data
        return User(**data)


class EventFactory(ModelFactory):
    def create(self, data: dict):
        # Create an Event instance from provided data
        return Event(**data)


class TicketFactory(ModelFactory):
    def create(self, data: dict):
        # Create a Ticket instance from provided data
        return Ticket(**data)


# Strategy Pattern for database interactions
class DatabaseOperationStrategy(ABC):
    @abstractmethod
    async def execute(self, table: str, data: dict):
        pass


class InsertStrategy(DatabaseOperationStrategy):
    async def execute(self, table: str, data: dict):
        response = SupabaseClientSingleton().table(table).insert(data).execute()
        return response.data


class UpdateStrategy(DatabaseOperationStrategy):
    async def execute(self, table: str, data: dict):
        response = SupabaseClientSingleton().table(table).update(data).eq('id', data['id']).execute()
        return response.data


class DeleteStrategy(DatabaseOperationStrategy):
    async def execute(self, table: str, data: dict):
        response = SupabaseClientSingleton().table(table).delete().eq('id', data['id']).execute()
        return response.data


class Repository:
    def __init__(self, strategy: DatabaseOperationStrategy):
        self.strategy = strategy

    async def perform_operation(self, table: str, data: dict):
        return await self.strategy.execute(table, data)


# Repository for User, Event, Ticket operations
class UserRepository:
    async def create_user(self, user: User):
        strategy = InsertStrategy()
        repository = Repository(strategy)
        return await repository.perform_operation('users', user.dict())

    async def get_user_by_email(self, email: str):
        response = SupabaseClientSingleton().table('users').select('*').eq('email', email).execute()
        return response.data


class EventRepository:
    async def create_event(self, event: Event):
        strategy = InsertStrategy()
        repository = Repository(strategy)
        return await repository.perform_operation('events', event.dict())

    async def update_event(self, event_id: int, event: Event):
        strategy = UpdateStrategy()
        repository = Repository(strategy)
        return await repository.perform_operation('events', {**event.dict(), "id": event_id})

    async def delete_event(self, event_id: int):
        strategy = DeleteStrategy()
        repository = Repository(strategy)
        return await repository.perform_operation('events', {"id": event_id})

    async def get_all_events(self):
        response = SupabaseClientSingleton().table('events').select("*").execute()
        return response.data

    async def get_event_by_id(self, event_id: int):
        response = SupabaseClientSingleton().table('events').select("*").eq('id', event_id).execute()
        return response.data


class TicketRepository:
    async def create_ticket(self, ticket: Ticket):
        strategy = InsertStrategy()
        repository = Repository(strategy)
        return await repository.perform_operation('tickets', ticket.dict())

    async def get_tickets_by_user(self, user_id: int):
        response = SupabaseClientSingleton().table('tickets').select('*').eq('user_id', user_id).execute()
        return response.data


# Usage of Design Patterns in CRUD operations

# Create User
async def create_user(user: User):
    user_repo = UserRepository()
    return await user_repo.create_user(user)

# Get User by Email
async def get_user_by_email(email: str):
    user_repo = UserRepository()
    return await user_repo.get_user_by_email(email)

# Create Event
async def create_event(event: Event):
    event_repo = EventRepository()
    return await event_repo.create_event(event)

# Update Event
async def update_event(event_id: int, event: Event):
    event_repo = EventRepository()
    return await event_repo.update_event(event_id, event)

# Delete Event
async def delete_event(event_id: int):
    event_repo = EventRepository()
    return await event_repo.delete_event(event_id)

# Get All Events
async def get_all_events():
    event_repo = EventRepository()
    return await event_repo.get_all_events()

# Get Event by ID
async def get_event_by_id(event_id: int):
    event_repo = EventRepository()
    return await event_repo.get_event_by_id(event_id)

# Create Ticket
async def create_ticket(ticket: Ticket):
    ticket_repo = TicketRepository()
    return await ticket_repo.create_ticket(ticket)

# Get Tickets by User ID
async def get_tickets_by_user(user_id: int):
    ticket_repo = TicketRepository()
    return await ticket_repo.get_tickets_by_user(user_id)
