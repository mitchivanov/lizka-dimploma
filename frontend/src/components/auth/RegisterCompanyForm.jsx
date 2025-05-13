import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Alert, 
  CircularProgress, 
  Paper,
  Container,
  Grid,
  InputAdornment,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormControlLabel,
  Checkbox,
  Link
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email as EmailIcon,
  Lock as LockIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Description as DescriptionIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

const RegisterCompanyForm = ({ switchTab }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    account: {
      email: '',
      password: ''
    },
    name: '',
    director_full_name: '',
    inn: '',
    legal_address: '',
    year_founded: '',
    description: ''
  });
  
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  
  const { registerCompany } = useAuth();

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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateStep = (step) => {
    setError('');
    
    switch (step) {
      case 0: // Основная информация
        if (!formData.name || !formData.director_full_name || !formData.inn) {
          setError('Пожалуйста, заполните все обязательные поля на этом шаге');
          return false;
        }
        break;
      case 1: // Дополнительная информация
        if (!formData.legal_address || !formData.year_founded || !formData.description) {
          setError('Пожалуйста, заполните все обязательные поля на этом шаге');
          return false;
        }
        break;
      case 2: // Аккаунт
        if (!formData.account.email || !formData.account.password) {
          setError('Пожалуйста, заполните все обязательные поля на этом шаге');
          return false;
        }
        if (formData.account.password !== passwordConfirm) {
          setError('Пароли не совпадают');
          return false;
        }
        break;
      case 3: // Подтверждение
        if (!acceptTerms) {
          setError('Необходимо принять условия использования');
          return false;
        }
        break;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    setError('');
    setSuccess('');
    
    if (!validateStep(3)) {
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await registerCompany(formData);
      
      if (result.success) {
        // Переключаемся на вкладку входа
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

  const handleStepAction = (step) => {
    if (validateStep(step)) {
      if (step === 3) {
        handleSubmit();
      } else {
        handleNext();
      }
    }
  };

  const steps = [
    {
      label: 'Основная информация',
      description: 'Введите основную информацию о компании',
      content: (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="name"
              label="Название компании"
              id="name"
              value={formData.name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="director_full_name"
              label="ФИО директора"
              id="director_full_name"
              value={formData.director_full_name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="inn"
              label="ИНН"
              id="inn"
              value={formData.inn}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AssignmentIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      )
    },
    {
      label: 'Дополнительная информация',
      description: 'Указание юридического адреса и дополнительных деталей',
      content: (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="legal_address"
              label="Юридический адрес"
              id="legal_address"
              value={formData.legal_address}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="year_founded"
              label="Год основания"
              id="year_founded"
              type="number"
              inputProps={{ min: 1900, max: new Date().getFullYear() }}
              value={formData.year_founded}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="description"
              label="Описание"
              id="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      )
    },
    {
      label: 'Учетные данные',
      description: 'Создание учетной записи для входа в систему',
      content: (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={formData.account.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="password"
              label="Пароль"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={formData.account.password}
              onChange={handleChange}
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
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="passwordConfirm"
              label="Подтверждение пароля"
              type={showPasswordConfirm ? 'text' : 'password'}
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
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
                      onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                      edge="end"
                    >
                      {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      )
    },
    {
      label: 'Подтверждение',
      description: 'Подтверждение ваших данных и завершение регистрации',
      content: (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Проверьте введенные данные:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Название компании:</Typography>
              <Typography variant="body1" gutterBottom>{formData.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Директор:</Typography>
              <Typography variant="body1" gutterBottom>{formData.director_full_name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">ИНН:</Typography>
              <Typography variant="body1" gutterBottom>{formData.inn}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Год основания:</Typography>
              <Typography variant="body1" gutterBottom>{formData.year_founded}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">Юридический адрес:</Typography>
              <Typography variant="body1" gutterBottom>{formData.legal_address}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">Email:</Typography>
              <Typography variant="body1" gutterBottom>{formData.account.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={acceptTerms} 
                    onChange={(e) => setAcceptTerms(e.target.checked)} 
                    color="primary"
                    required
                  />
                }
                label={
                  <Typography variant="body2">
                    Я согласен с <Link href="#" underline="hover">условиями использования</Link> и <Link href="#" underline="hover">политикой конфиденциальности</Link>
                  </Typography>
                }
              />
            </Grid>
          </Grid>
        </Box>
      )
    }
  ];

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
      <Box sx={{ mb: 4, textAlign: 'center', maxWidth: 600 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Регистрация компании
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Заполните информацию для создания корпоративного аккаунта
        </Typography>
      </Box>
      
      <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', px: 2 }}>
        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 1 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 3, borderRadius: 1 }}>{success}</Alert>}
        
        <Box 
          component="form" 
          onSubmit={(e) => {
            e.preventDefault();
            handleStepAction(activeStep);
          }} 
          noValidate 
          sx={{ 
            width: '100%'
          }}
        >
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>
                  <Typography variant="subtitle1">{step.label}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {step.description}
                  </Typography>
                  
                  {step.content}
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      startIcon={<ArrowBackIcon />}
                    >
                      Назад
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleStepAction(index)}
                      endIcon={index === steps.length - 1 ? null : <ArrowForwardIcon />}
                      disabled={loading}
                    >
                      {index === steps.length - 1 ? (
                        loading ? <CircularProgress size={24} /> : 'Зарегистрировать'
                      ) : (
                        'Далее'
                      )}
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterCompanyForm; 