"use client";

import { useAuth } from "@/context/AuthContext";
import { FaRegHeart } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

import LoadingSpinner from "../../../ultils/loadingSpinner/loadingspinner";
import { formatPostDate } from "../../../ultils/date/date";
import { deletePost, likeUnlikePost } from "../../../services/postServices";

const Post = ({ post: initialPost }) => {
  const { authUser } = useAuth();
  const [post, setPost] = useState(initialPost);
  const [comment, setComment] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  if (!post || !post.user) {
    return null;
  }

  const postOwner = post?.user;
  const isLiked = authUser && post?.likes?.includes(authUser._id);
  const isMyPost = authUser && authUser._id === postOwner?._id;
  const formattedDate = post?.createdAt ? formatPostDate(post.createdAt) : "";

  const handleDeletePost = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    setError(null);
    setSuccessMessage("");
    try {
      await deletePost(post._id);
      setSuccessMessage("Post deleted successfully");
      setPost(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

const handleLikePost = async () => {
  if (isLiking || !post || !authUser) return;
  setIsLiking(true);
  setError(null);

  const wasLiked = isLiked;
  setPost((prev) => ({
    ...prev,
    likes: wasLiked
      ? prev.likes.filter((id) => id !== authUser._id)
      : [...prev.likes, authUser._id],
  }));

  try {
    await likeUnlikePost(post._id);
  } catch (err) {
    setPost((prev) => ({
      ...prev,
      likes: wasLiked
        ? [...prev.likes, authUser._id]
        : prev.likes.filter((id) => id !== authUser._id),
    }));
    setError(err.message);
    toast.error(`Error: ${err.message}`);
  } finally {
    setIsLiking(false);
  }
};


  if (!post) {
    return null;
  }

  return (
    <div className="flex gap-2 items-start p-4 border-b border-gray-700">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {successMessage && <div className="text-green-500 text-sm">{successMessage}</div>}

      <div
        className="avatar"
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Link href={`/profile/${postOwner?.username}`}>
          <img
            src={postOwner?.profile_img || "/defaultuser.png"}
            alt={postOwner?.username}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Link>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex gap-2 items-center">
          <Link href={`/profile/${postOwner?.username}`} className="font-bold">
            {postOwner?.fullName}
          </Link>
          <span className="text-gray-500 flex gap-1 text-sm">
            <Link href={`/profile/${postOwner?.username}`}>@{postOwner?.username}</Link>
            <span>·</span>
            <span>{formattedDate}</span>
          </span>
          {isMyPost && (
            <span className="flex justify-end flex-1">
              {!isDeleting && (
                <FaTrash className="cursor-pointer hover:text-red-500" onClick={handleDeletePost} />
              )}
              {isDeleting && <LoadingSpinner size="sm" />}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 overflow-hidden">
          <span>{post?.text}</span>
          {post?.img && (
            <img
              src={post.img}
              className="h-80 object-contain rounded-lg border border-gray-700"
              alt="Post Content"
            />
          )}
        </div>

        <div className="flex justify-between mt-3">
          <div className="flex gap-4 w-2/3 justify-around items-end">


            <div
              className="flex gap-1 items-center group cursor-pointer"
              onClick={authUser ? handleLikePost : null}
            >
              {isLiking && <LoadingSpinner size="sm" />}
              {!isLiked && !isLiking && (
                <FaRegHeart className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500" />
              )}
              {isLiked && !isLiking && (
                <FaRegHeart className="w-4 h-4 cursor-pointer text-pink-500" />
              )}
              <span
                className={`text-sm group-hover:text-pink-500 ${
                  isLiked ? "text-pink-500" : "text-slate-500"
                }`}
              >
                {post?.likes?.length || 0}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Post;
