import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Box, 
  Tabs, 
  Tab, 
  Container, 
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import LoginForm from './LoginForm';
import RegisterUserForm from './RegisterUserForm';
import RegisterCompanyForm from './RegisterCompanyForm';

// Компонент для отображения контента вкладки
function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const Auth = () => {
  const location = useLocation();
  const defaultTab = location.state?.defaultTab || 0;
  
  const [tabValue, setTabValue] = useState(defaultTab);
  const [registerType, setRegisterType] = useState(0); // 0 - user, 1 - company
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Переключение между вкладками программно
  const switchTab = (newTabValue) => {
    setTabValue(newTabValue);
  };

  // Проверка параметров URL при загрузке
  useEffect(() => {
    if (location.state?.defaultTab !== undefined) {
      setTabValue(location.state.defaultTab);
    }
  }, [location.state]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleRegisterTypeChange = (event, newValue) => {
    setRegisterType(newValue);
  };

  return (
    <Container maxWidth={false} sx={{ py: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box 
        sx={{ 
          width: '100%', 
          mb: 5,
          textAlign: 'center'
        }}
      >
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold',
            mb: 2,
            background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          YAMS
        </Typography>
        <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
          Система управления сделками для бизнеса
        </Typography>
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: 2, 
          overflow: 'hidden',
          mb: 5,
          width: '1200px',
          maxWidth: '100%',
          minHeight: '700px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider', 
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant={isSmallScreen ? "fullWidth" : "standard"}
            centered
            textColor="primary"
            indicatorColor="primary"
            sx={{ 
              '& .MuiTab-root': { 
                fontWeight: 'bold',
                py: 2,
                fontSize: '1rem'
              } 
            }}
          >
            <Tab label="Вход в систему" />
            <Tab label="Регистрация" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <LoginForm />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Typography 
                variant="h6" 
                align="center" 
                gutterBottom
                color="text.secondary"
              >
                Выберите тип регистрации
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={10} md={8} lg={6} sx={{ mx: 'auto' }}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <Card 
                    raised={registerType === 0}
                    onClick={() => setRegisterType(0)}
                    sx={{ 
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      transform: registerType === 0 ? 'scale(1.03)' : 'scale(1)',
                      border: registerType === 0 ? `2px solid ${theme.palette.primary.main}` : 'none',
                      '&:hover': {
                        transform: 'scale(1.03)',
                      }
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Typography variant="h6" component="div" gutterBottom>
                        Пользователь
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Зарегистрируйтесь как частное лицо для использования системы
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card 
                    raised={registerType === 1}
                    onClick={() => setRegisterType(1)}
                    sx={{ 
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      transform: registerType === 1 ? 'scale(1.03)' : 'scale(1)',
                      border: registerType === 1 ? `2px solid ${theme.palette.primary.main}` : 'none',
                      '&:hover': {
                        transform: 'scale(1.03)',
                      }
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Typography variant="h6" component="div" gutterBottom>
                        Компания
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Регистрация юридического лица с расширенными возможностями
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ mt: 3, width: '100%', maxWidth: 1000 }}>
                {registerType === 0 && <RegisterUserForm switchTab={switchTab} />}
                {registerType === 1 && <RegisterCompanyForm switchTab={switchTab} />}
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Auth; 