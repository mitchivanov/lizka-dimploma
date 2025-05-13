import { useAuth } from '../contexts/AuthContext';
import { companies } from '../mocks/companies';
import CompanyCard from '../components/companies/CompanyCard';
import { Box, Typography, Grid, Paper, Button, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Login as LoginIcon, PersonAdd as RegisterIcon } from '@mui/icons-material';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';

// Компонент главной страницы
const Home = () => {
  const { user } = useAuth();
  console.log('[Home] user из useAuth:', user);
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <HeroSection />
      
      {/* Контейнер для основного контента */}
      <Box
        component="main"
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          pb: 8
        }}
      >
        {/* Основной контент ниже hero-секции */}
        {user?.role === 'user' && (
          <>
            <Typography 
              variant="h4" 
              fontWeight={600} 
              gutterBottom 
              sx={{ mb: 3 }}
            >
              Топ-6 компаний
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)'
                },
                gap: 3,
                mb: 6
              }}
            >
              {companies
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 6)
                .map(company => (
                  <CompanyCard key={company.id} company={company} />
                ))}
            </Box>
          </>
        )}
        
        {user?.role === 'company' && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>Добро пожаловать!</Typography>
            <Typography>Здесь скоро появится аналитика и управление вашей компанией.</Typography>
          </Paper>
        )}
      </Box>
    </>
  );
};

// Экспорт компонента
export default Home; 