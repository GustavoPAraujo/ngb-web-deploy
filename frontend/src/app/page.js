'use client';


import React, { useState, useEffect } from 'react';
import Post from '../../src/components/posts/post';
import { getAllPosts } from '../../services/postServices';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getAllPosts();
        setPosts(posts); 
      } catch (error) {
        console.error("Erro ao buscar posts:", error.message);
        setError("Erro ao carregar os posts. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 pb-16">
      <h1 className="text-2xl font-bold mb-4">Últimos Posts</h1>
      <div className="grid grid-cols-1 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post key={post._id} post={post} /> 
          ))
        ) : (
          <div className="text-center text-gray-500">Nenhum post encontrado.</div>
        )}
      </div>
    </div>
  );
}
