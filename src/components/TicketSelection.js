// src/components/TicketSelection.js
import React, { useState } from 'react';

// Observer Pattern: TicketContext
const TicketContext = React.createContext();

// Strategy Pattern: Ticket Type Strategy
class TicketSelectionStrategy {
    selectTicket(ticketType, event) {}
}

class VipTicketStrategy extends TicketSelectionStrategy {
    selectTicket(ticketType, event) {
        if (ticketType === "VIP") {
            return `Selected VIP ticket for $${event.vip_price}`;
        }
        return '';
    }
}

class NormalTicketStrategy extends TicketSelectionStrategy {
    selectTicket(ticketType, event) {
        if (ticketType === "Normal") {
            return `Selected Normal ticket for $${event.normal_price}`;
        }
        return '';
    }
}

// Factory Pattern: Factory for Ticket Selection Logic
const createTicketStrategy = (ticketType) => {
    if (ticketType === 'VIP') {
        return new VipTicketStrategy();
    } else if (ticketType === 'Normal') {
        return new NormalTicketStrategy();
    }
    return null;
};

const TicketSelection = ({ event, ticketType, onTicketSelect }) => {
    const [ticketInfo, setTicketInfo] = useState('');

    // Handle ticket selection with Strategy Pattern
    const handleTicketSelect = (selectedTicketType) => {
        onTicketSelect(selectedTicketType); // Notify parent component
        const strategy = createTicketStrategy(selectedTicketType);
        if (strategy) {
            setTicketInfo(strategy.selectTicket(selectedTicketType, event)); // Display selected ticket info
        } else {
            setTicketInfo('');
        }
    };

    return (
        <div className="mt-4">
            <label className="block text-lg font-semibold text-gray-700">Select Ticket:</label>
            <select
                value={ticketType}
                onChange={(e) => handleTicketSelect(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            >
                <option value="">--Select--</option>
                <option value="VIP">VIP (${event.vip_price})</option>
                <option value="Normal">Normal (${event.normal_price})</option>
            </select>

            {ticketInfo && <p className="mt-2 text-gray-800">{ticketInfo}</p>}
        </div>
    );
};

// Singleton Pattern: Ticket Info Management (for simplicity)
let ticketInfoInstance = null;

const getTicketInfoInstance = () => {
    if (!ticketInfoInstance) {
        ticketInfoInstance = '';
    }
    return ticketInfoInstance;
};

export default TicketSelection;
