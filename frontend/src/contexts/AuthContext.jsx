import { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем авторизацию при загрузке приложения
    const token = authService.getCurrentToken();
    const role = authService.getCurrentRole();
    console.log('[AuthProvider] useEffect: token из localStorage =', token, 'role =', role);
    if (token) {
      setUser({ token, role });
      console.log('[AuthProvider] useEffect: setUser({ token, role })');
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      setUser({ token: data.access_token, role: data.role });
      console.log('[AuthProvider] login: setUser({ token:', data.access_token, ', role:', data.role, '})');
      return { success: true, data };
    } catch (error) {
      console.log('[AuthProvider] login: ошибка', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Ошибка при входе в систему' 
      };
    }
  };

  const registerUser = async (userData) => {
    try {
      const data = await authService.registerUser(userData);
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Ошибка при регистрации пользователя' 
      };
    }
  };

  const registerCompany = async (companyData) => {
    try {
      const data = await authService.registerCompany(companyData);
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Ошибка при регистрации компании' 
      };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    console.log('[AuthProvider] logout: setUser(null) и очищен localStorage');
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    registerUser,
    registerCompany
  };
  console.log('[AuthProvider] value:', value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 