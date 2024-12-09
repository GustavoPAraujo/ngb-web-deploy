
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return Boolean(token);
};


export const login = async (username, password) => {

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    return true;
  } catch (error) {
    throw new Error(error.message || 'Failed to login');
  }
};

export const signup = async (formData) => {

  const { full_name, username, email, password } = formData
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, username, email, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    return true;
  } catch (error) {
    throw new Error(error.message || 'Failed to signup');
  }
}

export const checkAuth = async () => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/authcheck`, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      return { isAuthenticated: true, user: data.user };
    } else {
      return { isAuthenticated: false };
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
    return { isAuthenticated: false };
  }
};
