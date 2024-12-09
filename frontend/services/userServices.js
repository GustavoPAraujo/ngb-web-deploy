'use server'

import { cookies } from "next/headers";

export async function getLoggedUserData(jwt) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/auth/authcheck`, {
    method: 'GET',
    headers: {
      Cookie: `jwt=${jwt}`,
    },
  });

  if (!response.ok) {
    throw new Error('Falha ao obter os dados do usuário');
  }

  const data = await response.json();
  return data.user;
}

export async function updateUser(formData) {
  const jwt = (await cookies()).get('jwt').value
  const response = await fetch(`${process.env.BACKEND_URL}/api/users/update`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `jwt=${jwt}`
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const response_data = await response.json();
    console.log(response_data.error);
    throw new Error(response_data.error || 'Falha ao atualizar informações');
  }

  return response.json();
}

export async function getUserProfile(username) {

  const jwt = (await cookies()).get('jwt').value

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/users/profile/${username}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: `jwt=${jwt}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar perfil: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    throw error;
  }
}

export async function toggleFollowUser(userId) {
  const jwt = (await cookies()).get('jwt').value;

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/users/toggle-follow/${userId}`, {
      method: 'POST',
      headers: {
        Cookie: `jwt=${jwt}`
      },
    });

    const data = await response.json();

    console.log(data)

    if (!response.ok) {
      throw new Error(`Erro ao toggle-follow: ${data.error}`);
    }

    return data;
  } catch (error) {
    console.error('Erro ao toggle perfil:', error);
    throw error;
  }
}

export async function searchUsers(query) {
  const jwt = (await cookies()).get('jwt')?.value;

  if (!query) {
    throw new Error("O parâmetro de busca (query) é obrigatório.");
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/users/search?query=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        Cookie: `jwt=${jwt}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao buscar usuários.');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
}
