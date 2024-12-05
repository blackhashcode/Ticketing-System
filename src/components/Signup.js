import React, { useState } from 'react';

/**
 * Factory Component for Input Fields
 * @param {string} id - The input field's unique identifier.
 * @param {string} type - The type of input (e.g., text, email, password).
 * @param {string} value - The value of the input field.
 * @param {function} onChange - Handler for the input field's onChange event.
 * @param {string} placeholder - Placeholder text for the input field.
 */
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

/**
 * Signup Component
 * This component renders a signup form where users can create a new account by providing a username, email, and password.
 */
function Signup() {
    // States to store user input for username, email, password, and role
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer'); // Default role is 'customer'

    /**
     * Handles form submission.
     * This function can be extended to send registration data to the backend.
     * @param {Event} e - The form submission event.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents page reload on form submission

        // Log user input to the console (for development purposes)
        console.log(`Username: ${username}, Email: ${email}, Password: ${password}, Role: ${role}`);

        // TODO: Integrate with backend registration API
    };

    return (
        <div className="signup-container bg-gray-50 min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Signup Here!!</h2>
                <p className="text-center text-gray-600 mb-6">Enter your credentials to create an account.</p>

                {/* Signup form */}
                <form onSubmit={handleSubmit}>
                    {/* Username input */}
                    <InputField
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />

                    {/* Email input */}
                    <InputField
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />

                    {/* Password input */}
                    <InputField
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />

                    {/* Role selection */}
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

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-indigo-600 transition"
                    >
                        Signup
                    </button>
                </form>

                {/* Google Authentication Button */}
                <button
                    type="button"
                    className="w-full mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-red-600 transition"
                    onClick={() => alert('Google Authentication Placeholder')}
                >
                    Signup with Google
                </button>

                {/* Additional options */}
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
