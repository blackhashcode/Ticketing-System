import React, { useState } from 'react';

/**
 * Login Component
 * This component renders a login form where users can enter their email and password to authenticate.
 * Based on the user's role, they will be redirected to the appropriate dashboard (User or Organizer).
 */
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Mock login validation
        if (email === 'user@example.com' && password === 'user123') {
            window.location.href = '/user-dashboard';
        } else if (email === 'organizer@example.com' && password === 'organizer123') {
            window.location.href = '/organizer-dashboard';
        } else {
            setErrorMessage('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
                {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter your email" 
                            required 
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter your password" 
                            required 
                        />
                    </div>

                    <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">Login</button>

                    <div className="mt-4 text-center">
                        <p>Don't have an account? <a href="/signup" className="text-blue-500">Sign up here</a></p>
                    </div>
                </form>

                {/* Google Authentication Button */}
                <div className="mt-6">
                    <button className="w-full p-3 bg-red-500 text-white rounded-md hover:bg-red-600">
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
