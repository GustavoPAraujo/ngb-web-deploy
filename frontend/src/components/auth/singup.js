"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signup, isAuthenticated } from '../../../services/authService';
import Link from 'next/link'

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
      if (isAuthenticated()){
        router.push('/');
      }
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signup(formData)
      alert('Login successful!');
      router.push('/');
    } catch(err){
      setError(err.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="w-3/4 max-w-md bg-gray-600 p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Signup</h1>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800"
        >
          Create Account
        </button>
        <div className="text-center mt-4">
          <p className="text-gray-300">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-gray-100 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
