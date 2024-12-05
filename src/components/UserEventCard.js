// src/components/EventCard.js
import React from 'react';

// Observer Pattern: EventContext
const EventContext = React.createContext();

// Strategy Pattern: Event Detail Strategy
class EventDetailStrategy {
    viewDetails(event) {}
}

class ConcertEventDetailStrategy extends EventDetailStrategy {
    viewDetails(event) {
        return `Viewing concert event: ${event.title} at ${event.venue}`;
    }
}

class ShowEventDetailStrategy extends EventDetailStrategy {
    viewDetails(event) {
        return `Viewing show event: ${event.title} at ${event.venue}`;
    }
}

// Factory Pattern: Event Detail Strategy Factory
const createEventDetailStrategy = (eventType) => {
    if (eventType === 'Concert') {
        return new ConcertEventDetailStrategy();
    } else if (eventType === 'Show') {
        return new ShowEventDetailStrategy();
    }
    return null;
};

// Composite Pattern: EventCard Collection
const EventCardCollection = ({ events, onSelectEvent }) => {
    return (
        <div>
            {events.map((event) => (
                <UserEventCard key={event.id} event={event} onSelectEvent={onSelectEvent} />
            ))}
        </div>
    );
};

const UserEventCard = ({ event, onSelectEvent }) => {
    // Command Pattern: Handle Select Event Action
    const handleEventSelection = () => {
        onSelectEvent(event);  // Perform the action on event selection
    };

    // Use Strategy Pattern to handle different event detail viewing logic
    const strategy = createEventDetailStrategy(event.type);
    const eventDetails = strategy ? strategy.viewDetails(event) : `Viewing event: ${event.title}`;

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <button
                className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition"
                onClick={handleEventSelection}
            >
                View Details
            </button>
            <p>{eventDetails}</p>
        </div>
    );
};

export { UserEventCard, EventCardCollection };

