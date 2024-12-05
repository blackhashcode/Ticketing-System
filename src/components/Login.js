import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';  // Import the Supabase client

// Strategy Pattern: Authentication strategies
const EmailPasswordStrategy = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
};

const GoogleAuthStrategy = async () => {
    // Add Google authentication logic here (for simplicity, assume it's a placeholder)
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) throw error;
    return data;
};

// AuthContext (Observer Pattern) - State management
class AuthContext {
    constructor() {
        if (!AuthContext.instance) {
            this.state = { loading: false, errorMessage: '', user: null };
            AuthContext.instance = this;
        }
        return AuthContext.instance;
    }

    getState() {
        return this.state;
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
    }
}

// Login Component
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  // Initialize useNavigate hook

    const authContext = new AuthContext(); // Observer pattern for state management
    const { loading: globalLoading, errorMessage: globalError } = authContext.getState();

    const handleSubmit = async (e, strategy) => {
        e.preventDefault();  // Prevent page reload on form submit
        authContext.setState({ loading: true });  // Set global loading state

        try {
            const user = await strategy(email, password);
            // Check user role and navigate accordingly
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('role')
                .eq('email', email)
                .single();

            if (userError) throw userError;

            if (userData) {
                if (userData.role === 'customer') {
                    navigate('/user-dashboard');
                } else if (userData.role === 'organizer') {
                    navigate('/organizer-dashboard');
                } else {
                    setErrorMessage('Role not assigned properly.');
                }
            }
        } catch (error) {
            setErrorMessage(error.message || 'Login failed');
        } finally {
            authContext.setState({ loading: false });  // Reset global loading state
        }
    };

    const handleGoogleLogin = async () => {
        await handleSubmit({}, GoogleAuthStrategy);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
                {globalError && <p className="text-red-500 text-center mb-4">{globalError}</p>}

                <form onSubmit={(e) => handleSubmit(e, EmailPasswordStrategy)}>
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

                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        disabled={globalLoading}
                    >
                        {globalLoading ? 'Logging in...' : 'Login'}
                    </button>

                    <div className="mt-4 text-center">
                        <p>Don't have an account? <a href="/signup" className="text-blue-500">Sign up here</a></p>
                    </div>
                </form>

                {/* Google Authentication Button */}
                <div className="mt-6">
                    <button
                        className="w-full p-3 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={handleGoogleLogin}
                    >
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
