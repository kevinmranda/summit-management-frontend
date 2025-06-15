import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: number;
  is_admin: boolean;
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
        console.log(decoded)

    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const isAdmin = () => {
  const token = getToken();
  if (!token) return false;
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.is_admin;
  } catch {
    return false;
  }
};