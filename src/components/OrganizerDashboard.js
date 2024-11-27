import React, { useState } from 'react';
import './Dashboard.css';

/**
 * OrganizerDashboard component
 * This component allows organizers to create, edit, and delete events.
 * It also displays the organizer's created events with detailed information.
 */
function OrganizerDashboard() {
    const [events, setEvents] = useState([]); // State to store the list of events
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        vipPrice: '',
        normalPrice: '',
        capacity: '',
        venue: '',
    }); // State for event form data
    const [editingEvent, setEditingEvent] = useState(null); // State to track the event being edited

    /**
     * Handle event creation or editing
     * Updates the events list with a new or modified event.
     */
    const handleCreateEvent = (e) => {
        e.preventDefault();
        if (editingEvent) {
            // Update existing event
            setEvents(
                events.map((event) =>
                    event.id === editingEvent.id ? { ...editingEvent, ...formData } : event
                )
            );
            setEditingEvent(null);
        } else {
            // Create a new event
            const newEvent = { id: events.length + 1, ...formData };
            setEvents([...events, newEvent]);
        }
        // Reset form data
        setFormData({
            title: '',
            description: '',
            date: '',
            vipPrice: '',
            normalPrice: '',
            capacity: '',
            venue: '',
        });
    };

    /**
     * Handle event editing
     * Populates the form with the selected event's details for editing.
     */
    const handleEditEvent = (event) => {
        setEditingEvent(event);
        setFormData(event);
    };

    /**
     * Handle event deletion
     * Removes the selected event from the events list.
     */
    const handleDeleteEvent = (id) => {
        setEvents(events.filter((event) => event.id !== id));
    };

    /**
     * Handle organizer logout
     * Displays a logout confirmation and redirects the organizer to the homepage.
     */
    const handleLogout = () => {
        alert('You have been logged out.');
        window.location.href = '/'; // Simulated logout redirect
    };

    return (
        <div className="dashboard-container">
            {/* Dashboard header with logout button */}
            <div className="dashboard-header">
                <h1>Welcome, Organizer</h1>
                <button className="btn logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            {/* Event creation form */}
            <div className="create-event-form">
                <h2>{editingEvent ? 'Edit Event' : 'Create Event'}</h2>
                <form onSubmit={handleCreateEvent}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="VIP Price"
                        value={formData.vipPrice}
                        onChange={(e) => setFormData({ ...formData, vipPrice: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Normal Price"
                        value={formData.normalPrice}
                        onChange={(e) => setFormData({ ...formData, normalPrice: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Total Capacity"
                        value={formData.capacity}
                        onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Venue"
                        value={formData.venue}
                        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                        required
                    />
                    <button type="submit" className="btn">{editingEvent ? 'Update Event' : 'Create Event'}</button>
                </form>
            </div>
            {/* Events list section */}
            <div className="events-list">
                <h2>Your Events</h2>
                {events.length === 0 ? (
                    <p>No events created yet.</p>
                ) : (
                    events.map((event) => (
                        <div key={event.id} className="event-card">
                            <h3>{event.title}</h3>
                            <p><strong>Description:</strong> {event.description}</p>
                            <p><strong>Date:</strong> {event.date}</p>
                            <p><strong>Venue:</strong> {event.venue}</p>
                            <p><strong>VIP Price:</strong> ${event.vipPrice}</p>
                            <p><strong>Normal Price:</strong> ${event.normalPrice}</p>
                            <p><strong>Capacity:</strong> {event.capacity}</p>
                            <button className="btn" onClick={() => handleEditEvent(event)}>
                                Edit
                            </button>
                            <button className="btn" onClick={() => handleDeleteEvent(event.id)}>
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default OrganizerDashboard;