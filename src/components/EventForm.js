// src/components/EventForm.js
import React from 'react';

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

export default EventForm;
