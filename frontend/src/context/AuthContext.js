"use client"; 
import { createContext, useContext, useState, useEffect } from 'react';
import { checkAuth } from '../../services/authService';


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const fetchAuth = async () => {
      const result = await checkAuth();
      if (result.isAuthenticated) {
        setIsLogged(true);
        setAuthUser(result.user);
      } else {
        setIsLogged(false);
        setAuthUser(null);
      }
      setLoadingAuth(false);
    };
    fetchAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, isLogged, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);