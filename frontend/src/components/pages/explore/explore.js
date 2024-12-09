'use client';

import React, { useState } from "react";
import { searchUsers } from "../../../../services/userServices";
import { redirect } from 'next/navigation';

export default function ExploreSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    

    const handleSearch = async () => {
        try {
            const users = await searchUsers(query);
            setResults(users);
            setError(null);
        } catch (err) {
            setError(err.message);
            setResults([]);
        }
    };

    const handleUserClick = (username) => {
        redirect(`/profile/${username}`);
    };

    return (
        <div className="min-h-screen bg-gray-800 text-gray-300">
            <div className="p-6">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">Explore</h1>

                <div className="flex items-center gap-2 mb-6 max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Search for users"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-3 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-md transition"
                    >
                        Search
                    </button>
                </div>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <div className="max-w-md mx-auto">
                    {results.length === 0 && !error ? (
                        <p className="text-gray-300 text-center">No results found</p>
                    ) : (
                        <div className="space-y-4">
                            {results.map((user) => (
                                <div
                                    key={user._id}
                                    className="flex items-center gap-4 p-4 border border-gray-500 rounded-lg bg-gray-700 hover:bg-gray-800 transition"
                                    onClick={() => handleUserClick(user.username)}
                                >
                                    <img
                                        src={user.profile_img ? user.profile_img : "/defaultuser.png"}
                                        alt={`${user.username} profile`}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <p className="font-bold text-white">{user.username}</p>
                                        <p className="text-gray-300">{user.full_name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


