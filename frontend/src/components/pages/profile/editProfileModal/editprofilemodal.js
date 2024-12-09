'use client';

import React, { useState, useEffect } from 'react';
import { updateUser } from '../../../../../services/userServices';

export default function EditProfileModal({ user, onClose, onUserUpdate, cover_img, profile_img }) {
  const [formData, setFormData] = useState({
    full_name: user.full_name || '',
    username: user.username || '',
    email: user.email || '',
    bio: user.bio || '',
    cover_img: cover_img || null,
    profile_img: profile_img || null,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      cover_img: cover_img || prev.cover_img,
      profile_img: profile_img || prev.profile_img,
    }));
  }, [cover_img, profile_img]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(formData);
      alert('Informações atualizadas com sucesso!');
      onUserUpdate(response.user);
      onClose();
    } catch (error) {
      console.error(error.message);
      alert('Erro ao atualizar informações.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-700 p-6 rounded shadow-lg w-1/2">
        <h2 className="text-xl mb-4 text-white">Editar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white">Nome Completo:</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full border p-2 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Nome de Usuário:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border p-2 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">E-mail:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Bio:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border p-2 text-black"
            />
          </div>

          {formData.cover_img && (
            <div className='mb-4'>
              <label className='block text-white mb-2'>Pré-visualização da Capa:</label>
              <img src={formData.cover_img} alt="Preview Capa" className='w-full h-32 object-cover' />
            </div>
          )}
          {formData.profile_img && (
            <div className='mb-4'>
              <label className='block text-white mb-2'>Pré-visualização da Foto de Perfil:</label>
              <img src={formData.profile_img} alt="Preview Perfil" className='w-32 h-32 rounded-full' />
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
