'use client'

import { useState } from 'react'
import { MdPostAdd } from "react-icons/md";
import CreatePostModal from '../createPostModal/createPostModal.js'

export default function PostBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreatePost = () => {
    console.log("ok")
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <button
        onClick={handleCreatePost}
        className="fixed bottom-20 right-4 sm-500:bottom-6 sm-500:right-6 z-50 
        bg-blue-800 text-white hover:bg-blue-500 
        p-4 rounded-full shadow-xl
        flex items-center justify-center">

        <MdPostAdd className="w-6 h-6 lg:w-8 lg:h-8" />
      </button>
      {isModalOpen && (
        <CreatePostModal onClose={handleCloseModal} />
      )}
    </>
  );
}
