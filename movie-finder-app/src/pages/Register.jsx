import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link, 
  Grid, 
  CssBaseline, 
  Avatar,
  Checkbox,
  FormControlLabel,
  Paper,
  InputAdornment,
  IconButton,
  Divider,
  useMediaQuery
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { 
  Email, 
  Person, 
  Lock, 
  Visibility, 
  VisibilityOff, 
  CheckCircleOutline 
} from '@mui/icons-material';
import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    primary: {
      main: '#ff4d4d',
    },
    secondary: {
      main: '#f9cb28',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '10px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #ff4d4d, #f9cb28)',
          '&:hover': {
            background: 'linear-gradient(45deg, #ff3333, #f9c000)',
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha('#ff4d4d', 0.5),
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ff4d4d',
              borderWidth: 2,
            }
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #ff4d4d, #f9cb28)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: alpha('#ffffff', 0.7),
          '&.Mui-checked': {
            color: '#ff4d4d',
          }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          fontWeight: 500,
          '&:hover': {
            textDecoration: 'underline',
          }
        }
      }
    }
  }
});

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    acceptTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {
      firstName: formData.firstName.trim() === '',
      lastName: formData.lastName.trim() === '',
      email: formData.email.trim() === '' || !formData.email.includes('@'),
      password: formData.password.trim() === '' || formData.password.length < 6,
      confirmPassword: formData.confirmPassword !== formData.password,
      acceptTerms: !formData.acceptTerms
    };
    
    setErrors(newErrors);
    
    if (!Object.values(newErrors).some(error => error)) {
      setIsLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          formData.email, 
          formData.password
        );
        console.log('User registered:', userCredential.user);
        toast.success("Registration successful! Welcome to HyperMovies!");
        navigate('/');
      } catch (error) {
        console.error('Registration error:', error.message);
        toast.error(error.message || "Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getPasswordHelperText = () => {
    if (errors.password) {
      if (formData.password.trim() === '') {
        return 'Password is required';
      }
      return 'Password should be at least 6 characters';
    }
    return '';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container 
        component="main" 
        maxWidth="sm" 
        sx={{ 
          minHeight: 'calc(100vh - 64px)', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          py: 4
        }}
      >
        <Paper 
          elevation={6} 
          sx={{ 
            p: { xs: 3, sm: 4 }, 
            width: '100%',
            borderRadius: 2,
            backdropFilter: 'blur(10px)',
            background: alpha(theme.palette.background.paper, 0.95),
            border: `1px solid ${alpha('#ffffff', 0.05)}`,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ width: 56, height: 56, mb: 2 }}>
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            
            <Typography component="h1" variant="h4" gutterBottom>
              Create Account
            </Typography>
            
            <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
              Join HyperMovies to track and discover your favorite films
            </Typography>
            
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                
                <Grid item width={'100%'}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    helperText={errors.email && 'Please enter a valid email address'}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: theme.palette.text.secondary }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item width={'100%'}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    helperText={getPasswordHelperText()}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: theme.palette.text.secondary }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(show => !show)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item width={'100%'}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    helperText={errors.confirmPassword && 'Passwords must match'}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: theme.palette.text.secondary }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={() => setShowConfirmPassword(show => !show)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item width={'100%'}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        name="acceptTerms" 
                        color="primary" 
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        icon={<CheckCircleOutline />}
                        checkedIcon={<CheckCircleOutline />}
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I agree to the{' '}
                        <Link href="https://www.themoviedb.org/terms-of-use" color="secondary">
                          Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link href="https://www.themoviedb.org/privacy-policy" color="secondary">
                          Privacy Policy
                        </Link>
                      </Typography>
                    }
                  />
                  {errors.acceptTerms && (
                    <Typography color="error" variant="body2" sx={{ mt: 0.5, ml: 2 }}>
                      You must accept the terms and conditions
                    </Typography>
                  )}
                </Grid>
              </Grid>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled={isLoading}
                sx={{ 
                  mt: 3, 
                  mb: 2,
                  py: 1.5,
                  fontSize: '1rem'
                }}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
              
              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </Divider>
              
              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Typography variant="body2" color="textSecondary" display="inline">
                  Already have an account?{' '}
                </Typography>
                <Link href="/login" variant="body2" color="secondary">
                  Sign In
                </Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}