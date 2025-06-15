import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  role: string;
  user_id: number;
}

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const decodeAndSetAuthState = (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      const isValid = decoded.exp * 1000 > Date.now();

      if (isValid) {
        setIsAuthenticated(true);
        setIsAdmin(decoded.role === 'admin');
      } else {
        logout();
      }
    } catch (err) {
      console.error('Invalid token:', err);
      logout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) decodeAndSetAuthState(token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    decodeAndSetAuthState(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
