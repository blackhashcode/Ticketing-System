// src/components/EventCard.js
import React from 'react';

const EventCard = ({ event, onEdit, onDelete }) => (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Venue:</strong> {event.venue}</p>
        <p><strong>VIP Price:</strong> ${event.vip_price}</p>
        <p><strong>Normal Price:</strong> ${event.normal_price}</p>
        <p><strong>Capacity:</strong> {event.total_capacity}</p>
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

export default EventCard;
