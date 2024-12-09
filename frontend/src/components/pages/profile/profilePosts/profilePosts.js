"use client";

import { useState, useEffect } from "react";
import Post from "../../../posts/post";
import PostSkeleton from "../../../posts/postSkeleton/postskeleton";
import { getUserPosts } from "../../../../../services/postServices";

const ProfilePosts = ({ username }) => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isRefetching, setRefetching] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setRefetching(true);
      const data = await getUserPosts(username);
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setRefetching(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchPosts();
    }
  }, [username]);

  const isLoadingOrRefetching = isLoading || isRefetching;

  if (error) {
    return <p className="text-center my-4">Erro ao carregar posts: {error}</p>;
  }

  if (isLoadingOrRefetching) {
    return (
      <div className="flex flex-col justify-center">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  if (posts?.length === 0) {
    return <p className="text-center my-4">No posts found 👻</p>;
  }

  return (
    <div>
      {posts && posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default ProfilePosts;
