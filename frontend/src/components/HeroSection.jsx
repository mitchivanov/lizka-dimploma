import { Box, Typography, Button, Stack, Container } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{
      width: '1440px',
      margin: '0 auto',
      minHeight: '400px',
      backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      marginBottom: '48px',
      borderRadius: '12px'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="rgba(255,255,255,.05)" fillRule="evenodd"/%3E%3C/svg%3E")',
        opacity: 0.3,
        borderRadius: '12px'
      }} />
      
      <div style={{ 
        padding: '64px 20px',
        position: 'relative', 
        zIndex: 1,
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '48px',
          fontWeight: '700',
          margin: '0 0 16px 0',
          textShadow: '0 2px 10px rgba(0,0,0,0.2)',
          letterSpacing: '-0.5px'
        }}>
          YAMS — система управления сделками
        </h1>
        
        <p style={{ 
          fontSize: '20px',
            marginBottom: '40px',
            maxWidth: '700px',
            margin: '0 auto 40px auto',
            opacity: '0.9',
            fontWeight: '400',
            lineHeight: '1.5'
        }}>
          {isAuthenticated
            ? (user?.role === 'company'
                ? 'Добро пожаловать! Здесь вы можете управлять своей компанией и анализировать сделки.'
                : 'Добро пожаловать! Здесь вы можете просматривать лучшие компании и управлять своими сделками.')
            : 'Для работы с системой необходимо войти или зарегистрироваться.'}
        </p>
        
        {!isAuthenticated && (
          <div style={{ 
            display: 'flex', 
            gap: '24px', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={() => navigate('/auth')}
              style={{ 
                padding: '12px 32px', 
                fontSize: '16px',
                backgroundColor: 'white',
                color: '#1976d2',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.9)'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
            >
              Войти в систему
            </button>
            <button 
              onClick={() => navigate('/auth', { state: { defaultTab: 1 } })}
              style={{ 
                padding: '12px 32px', 
                fontSize: '16px',
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid white',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Регистрация
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection; 