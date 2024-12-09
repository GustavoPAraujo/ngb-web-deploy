'use client';

import { useState, useRef } from 'react';
import { createPost } from '../../../../services/postServices';

export default function CreatePostModal({ onClose }) {
  const [formData, setFormData] = useState({
    text: '',
    img: '',
  });

  const fileInputRef = useRef(null);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, img: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await createPost(formData);
      alert('Post criado com sucesso!');
      onClose();
    } catch (error) {
      console.error(error.message);
      alert('Erro ao criar o post.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-700 p-6 rounded shadow-lg w-1/2">
        <h2 className="text-xl mb-4 text-white">Criar novo post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white">Texto:</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleTextChange}
              className="w-full border p-2 text-black"
              placeholder="O que está acontecendo?"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Imagem:</label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-2 text-black"
            />
            {formData.img && (
              <div className="mt-2">
                <img
                  src={formData.img}
                  alt="Pré-visualização"
                  className="max-w-full h-auto rounded"
                />
              </div>
            )}
          </div>
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
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
