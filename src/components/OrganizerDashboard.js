import React, { useState } from 'react';

/**
 * EventCard Component
 * Displays each event and provides buttons for editing or deleting the event.
 */
const EventCard = ({ event, onEdit, onDelete }) => (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Venue:</strong> {event.venue}</p>
        <p><strong>VIP Price:</strong> ${event.vipPrice}</p>
        <p><strong>Normal Price:</strong> ${event.normalPrice}</p>
        <p><strong>Capacity:</strong> {event.capacity}</p>
        <div className="mt-4 flex space-x-2">
            <button
                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition"
                onClick={() => onEdit(event)}
            >
                Edit
            </button>
            <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                onClick={() => onDelete(event.id)}
            >
                Delete
            </button>
        </div>
    </div>
);

/**
 * EventForm Component
 * Handles the form to create or edit events.
 * Uses Factory Method to create forms for different purposes.
 */
const EventForm = ({ formData, setFormData, onSubmit, editingEvent }) => (
    <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">{editingEvent ? 'Edit Event' : 'Create Event'}</h2>
        <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
        />
        <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
        />
        <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
        />
        <input
            type="number"
            placeholder="VIP Price"
            value={formData.vipPrice}
            onChange={(e) => setFormData({ ...formData, vipPrice: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
        />
        <input
            type="number"
            placeholder="Normal Price"
            value={formData.normalPrice}
            onChange={(e) => setFormData({ ...formData, normalPrice: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
        />
        <input
            type="number"
            placeholder="Total Capacity"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
        />
        <input
            type="text"
            placeholder="Venue"
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
        />
        <button
            type="submit"
            className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition"
        >
            {editingEvent ? 'Update Event' : 'Create Event'}
        </button>
    </form>
);

/**
 * OrganizerDashboard Component
 * Allows the organizer to create, edit, and delete events.
 * Also displays the list of events created by the organizer.
 */
function OrganizerDashboard() {
    const [events, setEvents] = useState([]); // State to store events list
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        vipPrice: '',
        normalPrice: '',
        capacity: '',
        venue: '',
    }); // State for form data
    const [editingEvent, setEditingEvent] = useState(null); // Event being edited

    /**
     * Handle event creation or editing
     */
    const handleCreateEvent = (e) => {
        e.preventDefault();
        if (editingEvent) {
            // Update event
            setEvents(
                events.map((event) =>
                    event.id === editingEvent.id ? { ...editingEvent, ...formData } : event
                )
            );
            setEditingEvent(null);
        } else {
            // Create new event
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
     */
    const handleEditEvent = (event) => {
        setEditingEvent(event);
        setFormData(event);
    };

    /**
     * Handle event deletion
     */
    const handleDeleteEvent = (id) => {
        setEvents(events.filter((event) => event.id !== id));
    };

    /**
     * Handle organizer logout
     */
    const handleLogout = () => {
        alert('You have been logged out.');
        window.location.href = '/'; // Simulated logout redirect
    };

    return (
        <div className="dashboard-container bg-gray-50 min-h-screen p-6">
            {/* Dashboard header */}
            <div className="dashboard-header flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Welcome, Organizer</h1>
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            {/* Event creation form */}
            <div className="create-event-form mb-8">
                <EventForm
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleCreateEvent}
                    editingEvent={editingEvent}
                />
            </div>

            {/* Events list */}
            <div className="events-list">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Events</h2>
                {events.length === 0 ? (
                    <p>No events created yet.</p>
                ) : (
                    events.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onEdit={handleEditEvent}
                            onDelete={handleDeleteEvent}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default OrganizerDashboard;
