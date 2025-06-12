import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getToken, setToken, removeToken, isAuthenticated, isAdmin } from '../services/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: isAuthenticated(),
    isAdmin: isAdmin(),
  });

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuthState({
        isAuthenticated: isAuthenticated(),
        isAdmin: isAdmin(),
      });
    }
  }, []);

  const login = (token: string) => {
    setToken(token);
    setAuthState({
      isAuthenticated: true,
      isAdmin: isAdmin(),
    });
  };

  const logout = () => {
    removeToken();
    setAuthState({
      isAuthenticated: false,
      isAdmin: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        isAdmin: authState.isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};