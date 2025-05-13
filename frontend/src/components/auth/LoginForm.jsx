import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Alert, 
  CircularProgress, 
  InputAdornment,
  IconButton,
  Divider,
  Checkbox,
  FormControlLabel,
  GlobalStyles
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Person as PersonIcon, 
  Lock as LockIcon,
  Login as LoginIcon
} from '@mui/icons-material';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginSuccess) {
      navigate('/');
    }
  }, [loginSuccess, navigate]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setLoginSuccess(false);
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        setLoginSuccess(true);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Произошла ошибка при входе в систему');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fillAdminCredentials = () => {
    setEmail('admin');
    setPassword('admin');
  };

  const autofillOverrideStyles = `
    /* Отмена стандартного серого цвета автозаполнения в Chrome */
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px white inset !important;
      -webkit-text-fill-color: #333333 !important;
      transition: background-color 5000s ease-in-out 0s;
    }
    
    /* Отмена стилей автозаполнения для Firefox */
    input:-moz-autofill,
    input:-moz-autofill:focus {
      box-shadow: 0 0 0 1000px white inset !important;
      -moz-text-fill-color: #333333 !important;
    }
    
    /* И для других браузеров */
    input:autofill {
      background-color: white !important;
      color: #333333 !important;
      box-shadow: 0 0 0 1000px white inset !important;
    }
  `;

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%',
        py: 3 
      }}
    >
      <GlobalStyles styles={autofillOverrideStyles} />
      
      <Box sx={{ mb: 4, textAlign: 'center', maxWidth: 500 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Войдите в свою учетную запись
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Введите свои учетные данные для доступа к системе
        </Typography>
      </Box>
      
      <Box sx={{ width: '100%', maxWidth: 450, mx: 'auto', px: 2 }}>
        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 1 }}>{error}</Alert>}
        
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          noValidate 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <TextField
            required
            fullWidth
            id="email"
            label="Email/Логин"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                bgcolor: 'white',
              },
              '& .MuiOutlinedInput-input': {
                bgcolor: 'white',
                color: '#333333',
              },
              '& .Mui-focused': {
                bgcolor: 'white',
              }
            }}
          />
          
          <TextField
            required
            fullWidth
            name="password"
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                bgcolor: 'white',
              },
              '& .MuiOutlinedInput-input': {
                bgcolor: 'white',
                color: '#333333',
              },
              '& .Mui-focused': {
                bgcolor: 'white',
              }
            }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)} 
                  color="primary"
                />
              }
              label={<Typography variant="body2">Запомнить меня</Typography>}
            />
            <Typography variant="body2" sx={{ color: 'primary.main', cursor: 'pointer' }}>
              Забыли пароль?
            </Typography>
          </Box>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ py: 1.5, mt: 1 }}
            startIcon={loading ? null : <LoginIcon />}
          >
            {loading ? <CircularProgress size={24} /> : 'Войти в систему'}
          </Button>
          
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">или</Typography>
          </Divider>
          
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={fillAdminCredentials}
            sx={{ py: 1.5 }}
          >
            Использовать демо-доступ (admin)
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm; 