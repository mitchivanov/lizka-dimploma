import axios from 'axios';

const API_URL = 'http://localhost:8001/auth';

export const authService = {
  login: async (email, password) => {
    // Специальная проверка для admin/admin
    if (email === 'admin' && password === 'admin') {
      const mockResponse = {
        message: "Успешный вход",
        access_token: "mock_admin_token",
        token_type: "bearer",
        role: "user"
      };
      localStorage.setItem('token', mockResponse.access_token);
      localStorage.setItem('role', mockResponse.role);
      return mockResponse;
    }

    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await axios.post(`${API_URL}/login`, formData);
    if (response.data && response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('role', response.data.role);
    }
    return response.data;
  },

  registerUser: async (userData) => {
    const response = await axios.post(`${API_URL}/register/user`, userData);
    return response.data;
  },

  registerCompany: async (companyData) => {
    const response = await axios.post(`${API_URL}/register/company`, companyData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  },

  getCurrentToken: () => {
    return localStorage.getItem('token');
  },

  getCurrentRole: () => {
    return localStorage.getItem('role');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
}; 