import React, { useState } from 'react';
import './Dashboard.css';

/**
 * UserDashboard component
 * This component represents the user's dashboard, displaying events and allowing users to
 * view event details, select ticket types (VIP/Normal), and proceed to the payment page.
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
        <div className="dashboard-container">
            {/* Dashboard header with logout button */}
            <div className="dashboard-header">
                <h1>Welcome, User</h1>
                <button className="btn logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            {/* Event list section */}
            <div className="events-list">
                <h2>Available Events</h2>
                {events.map((event) => (
                    <div key={event.id} className="event-card">
                        <h3>{event.title}</h3>
                        <p><strong>Venue:</strong> {event.venue}</p>
                        <button className="btn" onClick={() => setSelectedEvent(event)}>
                            View Details
                        </button>
                    </div>
                ))}
            </div>
            {/* Event details and ticket purchase section */}
            <div className="event-details">
                {selectedEvent ? (
                    <>
                        <h2>Event Details</h2>
                        <p><strong>Title:</strong> {selectedEvent.title}</p>
                        <p><strong>Date:</strong> {selectedEvent.date}</p>
                        <p><strong>Venue:</strong> {selectedEvent.venue}</p>
                        <p><strong>VIP Price:</strong> ${selectedEvent.vipPrice}</p>
                        <p><strong>Normal Price:</strong> ${selectedEvent.normalPrice}</p>
                        <label>
                            Select Ticket:
                            <select
                                value={ticketType}
                                onChange={(e) => setTicketType(e.target.value)}
                            >
                                <option value="">--Select--</option>
                                <option value="VIP">VIP (${selectedEvent.vipPrice})</option>
                                <option value="Normal">Normal (${selectedEvent.normalPrice})</option>
                            </select>
                        </label>
                        <button className="btn purchase-btn" onClick={handlePurchase}>
                            Purchase Ticket
                        </button>
                    </>
                ) : (
                    <p>Select an event to view details.</p>
                )}
            </div>
        </div>
    );
}

export default UserDashboard;
