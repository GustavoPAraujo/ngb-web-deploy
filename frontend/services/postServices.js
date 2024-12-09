'use server'

import { cookies } from "next/headers";


// Obtém todos os posts 
export async function getAllPosts() {
  const jwt = (await cookies()).get("jwt")?.value;

  const response = await fetch(`${process.env.BACKEND_URL}/api/posts/all`, {
    method: "GET",
    headers: {
      Cookie: `jwt=${jwt}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Falha ao obter todos os posts");
  }

  return await response.json();
}

// Obtém posts de um usuário específico
export async function getUserPosts(username) {
  const jwt = (await cookies()).get("jwt")?.value;
  const response = await fetch(`${process.env.BACKEND_URL}/api/posts/user/${username}`, {
    method: "GET",
    headers: { Cookie: `jwt=${jwt}` },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Falha ao obter posts do usuário");
  }
  return await response.json();
}

// Obtém posts dos usuários seguidos
export async function getFollowingPosts() {
  const jwt = (await cookies()).get("jwt")?.value;

  const response = await fetch(`${process.env.BACKEND_URL}/following`, {
    method: "GET",
    headers: {
      Cookie: `jwt=${jwt}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Falha ao obter posts dos usuários seguidos");
  }

  return await response.json();
}

// Cria um novo post
export async function createPost(postData) {
  const jwt = (await cookies()).get("jwt")?.value;

  const response = await fetch(`${process.env.BACKEND_URL}/api/posts/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `jwt=${jwt}`,
    },
    credentials: "include",
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Falha ao criar o post");
  }

  return await response.json();
}

// Curtir/descurtir um post
export async function likeUnlikePost(postId) {
  const jwt = (await cookies()).get("jwt")?.value;

  const response = await fetch(`${process.env.BACKEND_URL}/api/posts/like/${postId}`, {
    method: "POST",
    headers: {
      Cookie: `jwt=${jwt}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Falha ao curtir/descurtir o post");
  }

  return await response.json();
}

// Comentar em um post
export async function commentOnPost(postId, commentData) {
  const jwt = (await cookies()).get("jwt")?.value;

  const response = await fetch(`${process.env.BACKEND_URL}api/posts/comment/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `jwt=${jwt}`,
    },
    credentials: "include",
    body: JSON.stringify(commentData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Falha ao comentar no post");
  }

  return await response.json();
}

// Deleta um post
export async function deletePost(postId) {
  const jwt = (await cookies()).get("jwt")?.value;

  const response = await fetch(`${process.env.BACKEND_URL}/api/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Cookie: `jwt=${jwt}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Falha ao deletar o post");
  }

  return await response.json();
}