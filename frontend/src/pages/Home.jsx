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
      <div style={{
        width: '1440px',
        margin: '0 auto',
        padding: '0 20px 64px 20px'
      }}>
        {/* Основной контент ниже hero-секции */}
        {user?.role === 'user' && (
          <>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '600',
              marginBottom: '24px',
              color: '#2c3e50'
            }}>
              Топ-6 компаний
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '24px',
              marginBottom: '48px'
            }}>
              {companies
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 6)
                .map(company => (
                  <CompanyCard key={company.id} company={company} />
                ))}
            </div>
          </>
        )}
        
        {user?.role === 'company' && (
          <div style={{
            background: 'white',
            padding: '32px',
            textAlign: 'center',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#2c3e50' }}>
              Добро пожаловать!
            </h3>
            <p style={{ color: '#6c757d', fontSize: '16px', margin: '0' }}>
              Здесь скоро появится аналитика и управление вашей компанией.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

// Экспорт компонента
export default Home; 