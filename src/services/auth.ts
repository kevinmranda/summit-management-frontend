import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  user_id: number;      // Backend uses 'user_id' in JWT
  role: string;         // Backend includes role
  exp: number;
}

export const getToken = () => localStorage.getItem('token');

export const setToken = (token: string) => localStorage.setItem('token', token);

export const removeToken = () => localStorage.removeItem('token');

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // Not expired
  } catch {
    return false;
  }
};

export const isAdmin = () => {
  const token = getToken();
  if (!token) return false;
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.role === 'admin';
  } catch {
    return false;
  }
};

// Get user ID from token using 'user_id' (backend JWT field)
export const getUserIdFromToken = (): number | null => {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.user_id || null;
  } catch {
    return null;
  }
};
