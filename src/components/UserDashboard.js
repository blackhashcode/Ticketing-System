import React, { useState } from 'react';

/**
 * Event Card Component
 * Displays the event information and a button to view more details.
 * @param {object} event - The event data to be displayed.
 * @param {function} onSelectEvent - Callback function to handle event selection.
 */
const EventCard = ({ event, onSelectEvent }) => (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
        <p><strong>Venue:</strong> {event.venue}</p>
        <p><strong>Date:</strong> {event.date}</p>
        <button
            className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition"
            onClick={() => onSelectEvent(event)}
        >
            View Details
        </button>
    </div>
);

/**
 * TicketSelection Component
 * Displays the ticket selection options and handles ticket type selection.
 * @param {object} event - The event data to display ticket prices.
 * @param {string} ticketType - The selected ticket type.
 * @param {function} onTicketSelect - Callback function to update the ticket type.
 */
const TicketSelection = ({ event, ticketType, onTicketSelect }) => (
    <div className="mt-4">
        <label className="block text-lg font-semibold text-gray-700">Select Ticket:</label>
        <select
            value={ticketType}
            onChange={(e) => onTicketSelect(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
        >
            <option value="">--Select--</option>
            <option value="VIP">VIP (${event.vipPrice})</option>
            <option value="Normal">Normal (${event.normalPrice})</option>
        </select>
    </div>
);

/**
 * UserDashboard Component
 * Displays the user's dashboard with events, event details, and ticket purchase functionality.
 */
function UserDashboard() {
    const [selectedEvent, setSelectedEvent] = useState(null); // Track the selected event for details view
    const [ticketType, setTicketType] = useState(''); // Track selected ticket type (VIP/Normal)

    // Mock data representing available events
    const events = [
        { id: 1, title: 'Music Fest', date: '2024-12-10', vipPrice: 100, normalPrice: 50, venue: 'City Hall' },
        { id: 2, title: 'Tech Conference', date: '2024-12-15', vipPrice: 200, normalPrice: 100, venue: 'Convention Center' },
    ];

    /**
     * Handle ticket purchase
     * Validates the ticket type selection and redirects the user to the payment page.
     */
    const handlePurchase = () => {
        if (!ticketType) {
            alert('Please select a ticket type (VIP or Normal).');
            return;
        }
        alert(`Redirecting to payment page for ${ticketType} ticket...`);
        window.location.href = '/payment'; // Simulated payment page redirection
    };

    /**
     * Handle user logout
     * Displays a logout confirmation and redirects the user to the homepage.
     */
    const handleLogout = () => {
        alert('You have been logged out.');
        window.location.href = '/'; // Simulated logout redirect
    };

    return (
        <div className="dashboard-container bg-gray-50 min-h-screen p-6">
            {/* Dashboard header with logout button */}
            <div className="dashboard-header flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Welcome, User</h1>
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            {/* Event list section */}
            <div className="events-list">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Available Events</h2>
                {events.map((event) => (
                    <EventCard key={event.id} event={event} onSelectEvent={setSelectedEvent} />
                ))}
            </div>

            {/* Event details and ticket purchase section */}
            <div className="event-details mt-6">
                {selectedEvent ? (
                    <>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Event Details</h2>
                        <p><strong>Title:</strong> {selectedEvent.title}</p>
                        <p><strong>Date:</strong> {selectedEvent.date}</p>
                        <p><strong>Venue:</strong> {selectedEvent.venue}</p>
                        <p><strong>VIP Price:</strong> ${selectedEvent.vipPrice}</p>
                        <p><strong>Normal Price:</strong> ${selectedEvent.normalPrice}</p>

                        {/* Ticket selection */}
                        <TicketSelection
                            event={selectedEvent}
                            ticketType={ticketType}
                            onTicketSelect={setTicketType}
                        />

                        {/* Purchase button */}
                        <button
                            className="mt-6 bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition"
                            onClick={handlePurchase}
                        >
                            Purchase Ticket
                        </button>
                    </>
                ) : (
                    <p className="text-gray-600">Select an event to view details.</p>
                )}
            </div>
        </div>
    );
}

export default UserDashboard;
