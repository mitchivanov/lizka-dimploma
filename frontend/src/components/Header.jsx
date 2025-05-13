import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ mb: 4 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }} onClick={() => navigate('/') }>
          <img src="/logo192.png" alt="YAMS" style={{ width: 40, height: 40 }} />
          <Typography variant="h6" color="primary" fontWeight={700} letterSpacing={1}>
            YAMS
          </Typography>
        </Box>
        <Box>
          {isAuthenticated ? (
            <>
              <Typography variant="body1" sx={{ display: 'inline', mr: 2 }}>
                {user?.role === 'company' ? 'Компания' : 'Пользователь'}
              </Typography>
              <Button color="primary" variant="outlined" onClick={logout}>
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Button color="primary" onClick={() => navigate('/auth')}>Войти</Button>
              <Button color="primary" variant="outlined" sx={{ ml: 1 }} onClick={() => navigate('/auth', { state: { defaultTab: 1 } })}>
                Регистрация
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 