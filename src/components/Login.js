import React, { useState } from 'react';
import './Login.css';

/**
 * Login Component
 * This component renders a login form where users can enter their email and password to authenticate.
 * Based on the user's role, they will be redirected to the appropriate dashboard (User or Organizer).
 */
function Login() {
    // States to store user input for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // For displaying any error messages

    /**
     * Handles form submission and user authentication.
     * For demonstration, mock roles are used to redirect to the respective dashboard.
     * In a real application, authentication will involve backend API calls.
     * @param {Event} e - The form submission event.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents page reload on form submission

        // Mock logic to determine the user's role based on email (replace with API logic)
        if (email === 'user@example.com' && password === 'user123') {
            window.location.href = '/user-dashboard'; // Redirect to User Dashboard
        } else if (email === 'organizer@example.com' && password === 'organizer123') {
            window.location.href = '/organizer-dashboard'; // Redirect to Organizer Dashboard
        } else {
            // Display an error message if credentials are invalid
            setErrorMessage('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            {/* Error message */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {/* Login form */}
            <form onSubmit={handleSubmit} className="login-form">
                {/* Email input field */}
                <label htmlFor="email">Email:</label>
                <input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    placeholder="Enter your email"
                />

                {/* Password input field */}
                <label htmlFor="password">Password:</label>
                <input 
                    id="password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    placeholder="Enter your password"
                />

                {/* Submit button */}
                <button type="submit" className="btn">Login</button>
            </form>

            {/* Additional options */}
            <p>
                Don't have an account? <a href="/signup">Sign up here</a>.
            </p>
        </div>
    );
}

export default Login;