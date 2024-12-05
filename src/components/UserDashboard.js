import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient'; // Import supabase client
import { UserEventCard } from './UserEventCard'; // Use named import
import TicketSelection from './TicketSelection'; // Import TicketSelection component
import bKashQRCode from './bkash_qr.jpg'; // Import the QR code image for bKash

// Strategy Pattern: Payment Method Strategies
const CashPayment = ({ selectedEvent, ticketType, userId }) => {
    return supabase
        .from('tickets')
        .insert([{
            event_id: selectedEvent.id,
            user_id: userId,
            ticket_type: ticketType,
            payment_type: 'Paid on Cash',
        }]);
};

const bKashPayment = ({ selectedEvent, ticketType, userId }) => {
    return supabase
        .from('tickets')
        .insert([{
            event_id: selectedEvent.id,
            user_id: userId,
            ticket_type: ticketType,
            payment_type: 'Paid via bKash',
        }]);
};

const PaymentContext = {
    Cash: CashPayment,
    bKash: bKashPayment,
};

// Factory Pattern: Create Event Card based on event type
const createEventCard = (event, setSelectedEvent) => {
    return <UserEventCard key={event.id} event={event} onSelectEvent={setSelectedEvent} />;
};

function UserDashboard() {
    const [events, setEvents] = useState([]); // Store events fetched from Supabase
    const [selectedEvent, setSelectedEvent] = useState(null); // Track selected event
    const [ticketType, setTicketType] = useState(''); // Track selected ticket type (VIP/Normal)
    const [showQRCode, setShowQRCode] = useState(false); // Show QR code for bKash payment

    // Observer Pattern: Manage event fetching externally (could be expanded to a global state manager like Redux)
    const fetchEvents = async () => {
        try {
            const { data, error } = await supabase.from('events').select('*');
            if (error) throw error;
            setEvents(data); // Set events data in state
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents(); // Fetch events when the component mounts
    }, []);

    // Common function to handle ticket purchases
    const handleTicketPurchase = async (paymentMethod) => {
        if (!ticketType) {
            alert('Please select a ticket type (VIP or Normal).');
            return;
        }

        try {
            const { data: user, error } = await supabase.auth.getUser(); // Get the current logged-in user
            if (error || !user) {
                alert('Please log in to purchase tickets.');
                return;
            }

            if (!selectedEvent) {
                alert('Please select an event to purchase a ticket.');
                return;
            }

            console.log('Inserting ticket:', {
                event_id: selectedEvent.id,
                user_id: user.id,
                ticket_type: ticketType,
                payment_type: paymentMethod === 'bKash' ? 'Paid via bKash' : 'Paid on Cash',
            });

            // Using the Strategy Pattern to handle different payment methods
            const paymentFunction = PaymentContext[paymentMethod];
            const { error: insertError } = await paymentFunction({
                selectedEvent,
                ticketType,
                userId: user.id,
            });

            if (insertError) throw insertError;

            if (paymentMethod === 'bKash') {
                setShowQRCode(true); // Show QR code after successful purchase with bKash
            } else {
                alert('Ticket purchased successfully. Please pay at the stall to get your ticket.');
            }
        } catch (error) {
            console.error('Error purchasing ticket:', error);
            alert('Error purchasing ticket. Please try again.');
        }
    };

    // Handle customer logout
    const handleLogout = async () => {
        await supabase.auth.signOut(); // Sign out the user
        alert('You have been logged out.');
        window.location.href = '/'; // Redirect to homepage (simulated)
    };

    return (
        <div className="dashboard-container bg-gray-50 min-h-screen p-6">
            <div className="dashboard-header flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Welcome, Customer</h1>
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            <div className="events-list">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Available Events</h2>
                {events.length === 0 ? (
                    <p>No events available at the moment.</p>
                ) : (
                    events.map((event) => createEventCard(event, setSelectedEvent))
                )}
            </div>

            <div className="event-details mt-6">
                {selectedEvent ? (
                    <>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Event Details</h2>
                        <p><strong>Title:</strong> {selectedEvent.title}</p>
                        <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</p>
                        <p><strong>Venue:</strong> {selectedEvent.venue}</p>
                        <p><strong>VIP Price:</strong> ${selectedEvent.vip_price}</p>
                        <p><strong>Normal Price:</strong> ${selectedEvent.normal_price}</p>

                        <TicketSelection
                            event={selectedEvent}
                            ticketType={ticketType}
                            onTicketSelect={setTicketType}
                        />

                        <div className="flex space-x-4 mt-6">
                            <button
                                className="bg-yellow-500 text-white py-2 px-6 rounded-md hover:bg-yellow-600 transition"
                                onClick={() => handleTicketPurchase('Cash')}
                            >
                                Pay with Cash
                            </button>
                            <button
                                className="bg-pink-500 text-white py-2 px-6 rounded-md hover:bg-pink-600 transition"
                                onClick={() => handleTicketPurchase('bKash')}
                            >
                                Pay with bKash
                            </button>
                        </div>

                        {showQRCode && (
                            <div className="qr-code mt-6">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Scan this QR Code to complete your payment:
                                </h3>
                                <img src={bKashQRCode} alt="bKash QR Code" className="mt-4 w-48 h-48" />
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-gray-600">Select an event to view details.</p>
                )}
            </div>
        </div>
    );
}

export default UserDashboard;
