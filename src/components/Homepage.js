import React from 'react';

/**
 * ButtonFactory - Factory method to create buttons with different styles.
 * @param {string} label - The text to display on the button.
 * @param {string} className - Additional Tailwind CSS classes for styling the button.
 * @param {function} onClick - Callback function to handle button clicks.
 */
const ButtonFactory = ({ label, className, onClick }) => {
    // You could extend this factory with more button styles if necessary
    return React.createElement(
        'button',
        {
            className: `px-6 py-2 text-white font-semibold rounded-md shadow-md transition hover:scale-105 hover:shadow-lg ${className}`,
            onClick: onClick,
        },
        label
    );
};

/**
 * Singleton - A simple Singleton pattern to manage global states.
 * For example, tracking if the user is logged in.
 */
class Singleton {
    constructor() {
        if (!Singleton.instance) {
            this.state = { loggedIn: false }; // Default state
            Singleton.instance = this;
        }
        return Singleton.instance;
    }

    getState() {
        return this.state;
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
    }
}

/**
 * Homepage Component
 * Displays the main landing page of the website with options to navigate to Login or Signup pages.
 */
function Homepage() {
    const singleton = new Singleton();
    const { loggedIn } = singleton.getState();

    return React.createElement(
        'div',
        { className: 'homepage-container bg-gray-50 min-h-screen flex flex-col items-center justify-center p-6' },
        // Header Section
        React.createElement(
            'header',
            { className: 'homepage-header text-center mb-8' },
            React.createElement('h1', { className: 'text-4xl font-bold text-indigo-600 mb-2' }, 'TickTick'),
            React.createElement(
                'p',
                { className: 'text-gray-700 text-lg' },
                'TickTick is your go-to platform for all your ticketing needs in Bangladesh.'
            )
        ),
        // Buttons Section
        React.createElement(
            'div',
            { className: 'homepage-buttons flex gap-4' },
            // Login Button
            React.createElement(ButtonFactory, {
                label: 'Login',
                className: 'bg-indigo-500 hover:bg-indigo-600',
                onClick: () => {
                    // Simulate login process and update Singleton state
                    singleton.setState({ loggedIn: true });
                    window.location.href = '/login';
                },
            }),
            // Signup Button
            React.createElement(ButtonFactory, {
                label: 'Signup',
                className: 'bg-green-500 hover:bg-green-600',
                onClick: () => {
                    // Simulate signup process and update Singleton state
                    singleton.setState({ loggedIn: false });
                    window.location.href = '/signup';
                },
            }),
            // Conditional Button for Logged In User (Only if loggedIn is true)
            loggedIn &&
                React.createElement(ButtonFactory, {
                    label: 'Logout',
                    className: 'bg-red-500 hover:bg-red-600',
                    onClick: () => {
                        singleton.setState({ loggedIn: false });
                        window.location.href = '/logout'; // Simulate logout process
                    },
                })
        )
    );
}

export default Homepage;
