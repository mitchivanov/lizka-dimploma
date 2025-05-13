import { Box, Typography, Button, Stack, Container } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{
      width: '100%',
      minHeight: 400,
      backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      mb: 6,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="rgba(255,255,255,.05)" fill-rule="evenodd"/%3E%3C/svg%3E")',
        opacity: 0.3,
      }
    }}>
      <Container maxWidth="lg" sx={{ 
        position: 'relative', 
        zIndex: 1,
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center',
        py: 8
      }}>
        <Typography 
          variant="h2" 
          fontWeight={700} 
          sx={{ 
            mb: 2,
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            letterSpacing: '-0.5px'
          }}
        >
          YAMS — система управления сделками
        </Typography>
        
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 5, 
            maxWidth: 700, 
            mx: 'auto',
            opacity: 0.9,
            fontWeight: 400
          }}
        >
          {isAuthenticated
            ? (user?.role === 'company'
                ? 'Добро пожаловать! Здесь вы можете управлять своей компанией и анализировать сделки.'
                : 'Добро пожаловать! Здесь вы можете просматривать лучшие компании и управлять своими сделками.')
            : 'Для работы с системой необходимо войти или зарегистрироваться.'}
        </Typography>
        
        {!isAuthenticated && (
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            justifyContent="center"
          >
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => navigate('/auth')}
              sx={{ 
                px: 4, 
                py: 1.5, 
                fontSize: '1rem',
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                }
              }}
            >
              Войти в систему
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              onClick={() => navigate('/auth', { state: { defaultTab: 1 } })}
              sx={{ 
                px: 4, 
                py: 1.5, 
                fontSize: '1rem',
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                }
              }}
            >
              Регистрация
            </Button>
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default HeroSection; 