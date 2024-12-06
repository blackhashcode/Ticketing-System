import React, { useState, useEffect } from 'react';
import  supabase  from '../supabaseClient';  // Import supabase client
import EventCard from './EventCard';  // Import EventCard component
import EventForm from './EventForm';  // Import EventForm component

function OrganizerDashboard() {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        vipPrice: '',
        normalPrice: '',
        capacity: '',
        venue: '',
    });
    const [editingEvent, setEditingEvent] = useState(null);

    // Fetch events from Supabase
    const fetchEvents = async () => {
        try {
            const { data, error } = await supabase
                .from('events')
                .select('*');
            if (error) {
                throw error;
            }
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();  // Fetch events when the component mounts
    }, []);

    // Handle form submit (create or update event)
    const handleCreateEvent = async (e) => {
        e.preventDefault();
        if (editingEvent) {
            // Update event
            const { error } = await supabase
                .from('events')
                .update({
                    title: formData.title,
                    description: formData.description,
                    date: formData.date,
                    vip_price: formData.vipPrice,
                    normal_price: formData.normalPrice,
                    venue: formData.venue,
                    total_capacity: formData.capacity,
                })
                .eq('id', editingEvent.id);

            if (error) {
                console.error('Error updating event:', error);
            } else {
                setEditingEvent(null);
            }
        } else {
            // Create event
            const { error } = await supabase
                .from('events')
                .insert([{
                    title: formData.title,
                    description: formData.description,
                    date: formData.date,
                    vip_price: formData.vipPrice,
                    normal_price: formData.normalPrice,
                    venue: formData.venue,
                    total_capacity: formData.capacity,
                }]);

            if (error) {
                console.error('Error creating event:', error);
            }
        }

        // Reset form and fetch events again
        setFormData({
            title: '',
            description: '',
            date: '',
            vipPrice: '',
            normalPrice: '',
            capacity: '',
            venue: '',
        });
        fetchEvents();
    };

    // Handle edit event
    const handleEditEvent = (event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            date: event.date,
            vipPrice: event.vip_price,
            normalPrice: event.normal_price,
            capacity: event.total_capacity,
            venue: event.venue,
        });
    };

    // Handle delete event
    const handleDeleteEvent = async (id) => {
        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting event:', error);
        } else {
            fetchEvents();
        }
    };

    const handleLogout = () => {
        alert('You have been logged out.');
        window.location.href = '/';
    };

    return (
        <div className="dashboard-container bg-gray-50 min-h-screen p-6">
            <div className="dashboard-header flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Welcome, Organizer</h1>
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            <div className="create-event-form mb-8">
                <EventForm
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleCreateEvent}
                    editingEvent={editingEvent}
                />
            </div>

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