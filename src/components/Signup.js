import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

// Strategy Pattern: Different Signup Strategies
const EmailPasswordSignupStrategy = async (email, password, username, role) => {
    const { user, error: signupError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (signupError) {
        throw signupError;
    }

    // Insert user data (username and role) into the Supabase "users" table without the password
    const { data, error: insertError } = await supabase
        .from('users')
        .insert([{ username, email, role }]);

    if (insertError) {
        throw insertError;
    }

    return user;
};

// Observer Pattern: Auth State Manager for error and loading states
class AuthStateManager {
    constructor() {
        if (!AuthStateManager.instance) {
            this.state = { loading: false, errorMessage: '', user: null };
            AuthStateManager.instance = this;
        }
        return AuthStateManager.instance;
    }

    getState() {
        return this.state;
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
    }
}

// InputField component
const InputField = ({ id, type, value, onChange, placeholder }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-gray-700 font-semibold mb-2">
                {id.charAt(0).toUpperCase() + id.slice(1)}:
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
                required
            />
        </div>
    );
};

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer'); // Default role is 'customer'
    const [error, setError] = useState(null); // To store any error message
    const [loading, setLoading] = useState(false); // To handle loading state
    const navigate = useNavigate();  // Initialize useNavigate hook

    const authStateManager = new AuthStateManager(); // Observer pattern for state management
    const { loading: globalLoading, errorMessage: globalError } = authStateManager.getState();

    const handleSubmit = async (e, signupStrategy) => {
        e.preventDefault(); // Prevents page reload on form submission
        authStateManager.setState({ loading: true }); // Set loading state

        try {
            await signupStrategy(email, password, username, role);
            navigate('/login');  // Redirect to login after successful signup
        } catch (error) {
            setError(error.message || 'Signup failed');
        } finally {
            authStateManager.setState({ loading: false }); // Reset loading state
        }
    };

    return (
        <div className="signup-container bg-gray-50 min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Signup Here!!</h2>
                <p className="text-center text-gray-600 mb-6">Enter your credentials to create an account.</p>

                {globalError && <p className="text-red-500 text-center mb-4">{globalError}</p>} {/* Display error message */}

                <form onSubmit={(e) => handleSubmit(e, EmailPasswordSignupStrategy)}>
                    <InputField
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                    <InputField
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    <InputField
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Select Role:</label>
                        <div className="flex items-center">
                            <div className="mr-4">
                                <input
                                    type="radio"
                                    id="customer"
                                    name="role"
                                    value="customer"
                                    checked={role === 'customer'}
                                    onChange={() => setRole('customer')}
                                    className="mr-2"
                                />
                                <label htmlFor="customer" className="text-gray-700">Customer</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="organizer"
                                    name="role"
                                    value="organizer"
                                    checked={role === 'organizer'}
                                    onChange={() => setRole('organizer')}
                                    className="mr-2"
                                />
                                <label htmlFor="organizer" className="text-gray-700">Organizer</label>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-indigo-600 transition"
                        disabled={globalLoading}
                    >
                        {globalLoading ? 'Signing Up...' : 'Signup'}
                    </button>
                </form>

                <button
                    type="button"
                    className="w-full mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-red-600 transition"
                    onClick={() => alert('Google Authentication Placeholder')}
                >
                    Signup with Google
                </button>

                <p className="text-sm text-gray-600 mt-4 text-center">
                    Already have an account?{' '}
                    <a href="/login" className="text-indigo-500 hover:underline">
                        Login here
                    </a>.
                </p>
            </div>
        </div>
    );
}

export default Signup;
