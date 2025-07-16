// Utility functions để quản lý authentication

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const setTokens = (token, refreshToken) => {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
};

export const removeTokens = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const logoutAdmin = () => {
  removeTokens();
}; 

export const logoutUser = (navigate) => {
  removeTokens();
  navigate('/login');
}; 