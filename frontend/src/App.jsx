import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { 
  CssBaseline, 
  Box, 
  ThemeProvider, 
  createTheme, 
  Container, 
  Typography, 
  Paper, 
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  ExitToApp as LogoutIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Auth from './components/auth/Auth';
import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import CompanyPage from './pages/CompanyPage';
import DealsPage from './pages/DealsPage';

// Создаем тему для Material UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#4791db',
      dark: '#115293',
    },
    secondary: {
      main: '#dc004e',
      light: '#e33371',
      dark: '#9a0036',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.5px',
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// Защищенный маршрут
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  console.log('[ProtectedRoute] isAuthenticated:', isAuthenticated, 'user:', user, 'loading:', loading);
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="text.secondary">Загрузка...</Typography>
      </Box>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  
  return children;
};

// Оборачиваем в AuthProvider
const AppWithAuth = () => (
  <Router>
    <CssBaseline />
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/company/:id" 
        element={
          <ProtectedRoute>
            <CompanyPage />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/deals" 
        element={
          <ProtectedRoute>
            <DealsPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);

// Главный компонент приложения
function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppWithAuth />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
