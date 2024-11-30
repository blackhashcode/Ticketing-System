import React, { useState } from 'react';
import './Signup.css';

/**
 * Signup Component
 * Renders a signup form where users can create a new account by providing a username, email, and password.
 */
function Signup() {
    // States to store user input for username, email, and password
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /**
     * Handles form submission.
     * This function can be extended to send registration data to the backend.
     * @param {Event} e - The form submission event.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents page reload on form submission

        // Log user input to the console (for development purposes)
        console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);

        // TODO: Integrate with backend registration API
    };

    return (
        <div className="signup-container">
            <h2>Signup Here!!</h2>
            <p>Enter your Credentials to access your account</p>

            {/* Signup form */}
            <form onSubmit={handleSubmit} className="signup-form">
                {/* Username input field */}
                <label>Username:</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />

                {/* Email input field */}
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />

                {/* Password input field */}
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />

                {/* Submit button */}
                <button type="submit" className="btn">Signup</button>
            </form>
        </div>
    );
}

export default Signup;
