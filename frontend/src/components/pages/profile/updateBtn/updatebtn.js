'use client';

import React, { useState } from 'react';
import EditProfileModal from '@/components/pages/profile/editProfileModal/editprofilemodal';

export default function UpdateButton({ user, onUserUpdate, cover_img, profile_img }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleUpdate}
        className='
          bg-slate-600 hover:bg-slate-700 mr-2
          text-white font-bold py-2 px-4 rounded'
      >
        Editar Perfil
      </button>
      {isModalOpen && (
        <EditProfileModal
          user={user}
          onClose={handleCloseModal}
          onUserUpdate={onUserUpdate}
          cover_img={cover_img}
          profile_img={profile_img}
        />
      )}
    </>
  );
}
