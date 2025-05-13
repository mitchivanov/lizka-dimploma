import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Alert, 
  CircularProgress, 
  Checkbox,
  Link,
  InputAdornment,
  IconButton,
  GlobalStyles
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  PersonOutline as PersonIcon,
  Email as EmailIcon,
  LockOutlined as LockIcon,
  HowToReg as RegisterIcon
} from '@mui/icons-material';

const RegisterUserForm = ({ switchTab }) => {
  const [formData, setFormData] = useState({
    account: {
      email: '',
      password: ''
    },
    fullname: ''
  });
  
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { registerUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'email' || name === 'password') {
      setFormData({
        ...formData,
        account: {
          ...formData.account,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.account.email || !formData.account.password || !formData.fullname) {
      setError('Пожалуйста, заполните все обязательные поля');
      return;
    }
    if (formData.account.password !== passwordConfirm) {
      setError('Пароли не совпадают');
      return;
    }
    if (!acceptTerms) {
      setError('Необходимо принять условия использования');
      return;
    }
    setLoading(true);
    try {
      const result = await registerUser(formData);
      if (result.success) {
        // Сразу переходим на вкладку входа
        switchTab(0);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Произошла ошибка при регистрации');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm((prev) => !prev);
  };

  // Стили для отмены серого автозаполнения в Chrome, Firefox и др.
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
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Глобальные стили для исправления автозаполнения */}
      <GlobalStyles styles={autofillOverrideStyles} />
      
      <Typography variant="h4" component="h2" sx={{ mb: 1, fontWeight: 500, color: '#333' }}>
        Регистрация личного аккаунта
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
        Заполните информацию для создания учетной записи пользователя
      </Typography>

      <Box sx={{ width: '100%', maxWidth: 1000, px: 2 }}>
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: 2.5 }}>
            {/* ФИО поле */}
            <Box sx={{ flex: 1, position: 'relative' }}>
              <Typography variant="body2" component="label" htmlFor="fullname" sx={{ mb: 0.5, display: 'block' }}>
                ФИО *
              </Typography>
              <Box sx={{ position: 'relative' }}>
                <TextField
                  id="fullname"
                  name="fullname"
                  fullWidth
                  value={formData.fullname}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  autoComplete="name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
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
              </Box>
            </Box>
            
            {/* Email поле */}
            <Box sx={{ flex: 1, position: 'relative' }}>
              <Typography variant="body2" component="label" htmlFor="email" sx={{ mb: 0.5, display: 'block' }}>
                Email *
              </Typography>
              <Box sx={{ position: 'relative' }}>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  fullWidth
                  value={formData.account.email}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  autoComplete="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
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
              </Box>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: 2.5 }}>
            {/* Пароль поле */}
            <Box sx={{ flex: 1, position: 'relative' }}>
              <Typography variant="body2" component="label" htmlFor="password" sx={{ mb: 0.5, display: 'block' }}>
                Пароль *
              </Typography>
              <Box sx={{ position: 'relative' }}>
                <TextField
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  value={formData.account.password}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  autoComplete="new-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
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
              </Box>
            </Box>
            
            {/* Подтверждение пароля */}
            <Box sx={{ flex: 1, position: 'relative' }}>
              <Typography variant="body2" component="label" htmlFor="passwordConfirm" sx={{ mb: 0.5, display: 'block' }}>
                Подтверждение пароля *
              </Typography>
              <Box sx={{ position: 'relative' }}>
                <TextField
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type={showPasswordConfirm ? 'text' : 'password'}
                  fullWidth
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  variant="outlined"
                  required
                  autoComplete="new-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordConfirmVisibility}
                          edge="end"
                        >
                          {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
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
              </Box>
            </Box>
          </Box>
          
          {/* Чекбокс с соглашением - центрирован */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
            <Checkbox
              id="acceptTerms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              required
              sx={{ padding: '4px', marginRight: '4px' }}
            />
            <Typography variant="body2" component="label" htmlFor="acceptTerms">
              Я согласен с <Link href="#" underline="hover">условиями использования</Link> и <Link href="#" underline="hover">политикой конфиденциальности</Link> *
            </Typography>
          </Box>

          {/* Кнопка регистрации - центрирована */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <RegisterIcon />}
              sx={{ 
                py: 1.2, 
                px: 4, 
                borderRadius: '4px',
                textTransform: 'none',
                fontSize: '16px'
              }}
            >
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
            Регистрируясь, вы подтверждаете, что вам больше 18 лет и вы принимаете условия использования системы.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterUserForm; 