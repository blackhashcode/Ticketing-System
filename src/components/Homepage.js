import React from 'react';

/**
 * Factory Component for Button
 * @param {string} label - The text to display on the button.
 * @param {string} className - Additional Tailwind CSS classes for styling the button.
 * @param {function} onClick - Callback function to handle button clicks.
 */
const Button = ({ label, className, onClick }) => {
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
 * Homepage Component
 * Displays the main landing page of the website with options to navigate to Login or Signup pages.
 */
function Homepage() {
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
            React.createElement(Button, {
                label: 'Login',
                className: 'bg-indigo-500 hover:bg-indigo-600',
                onClick: () => (window.location.href = '/login'),
            }),
            // Signup Button
            React.createElement(Button, {
                label: 'Signup',
                className: 'bg-green-500 hover:bg-green-600',
                onClick: () => (window.location.href = '/signup'),
            })
        )
    );
}

export default Homepage;
