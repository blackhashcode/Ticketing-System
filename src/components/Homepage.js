import React from 'react';
import './Homepage.css';

/**
 * Homepage Component
 * Displays the main landing page of the website with options to navigate to Login or Signup pages.
 */
function Homepage() {
    return (
        <div className="homepage-container">
            {/* Header section containing the website's title and tagline */}
            <header className="homepage-header">
                <h1>TIckTIck</h1>
                <p>TickTick is your go-to platform for all your ticketing needs in Bangladesh.</p>
            </header>

            {/* Buttons for navigation to Login and Signup pages */}
            <div className="homepage-buttons">
                {/* Redirects to the Login page */}
                <button 
                    className="btn login-btn" 
                    onClick={() => window.location.href = '/login'}
                >
                    Login
                </button>

                {/* Redirects to the Signup page */}
                <button 
                    className="btn signup-btn" 
                    onClick={() => window.location.href = '/signup'}
                >
                    Signup
                </button>
            </div>
        </div>
    );
}

export default Homepage;
