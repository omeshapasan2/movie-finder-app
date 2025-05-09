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
  Paper,
  InputAdornment,
  IconButton,
  useMediaQuery,
  Divider
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { ThemeProvider, alpha } from '@mui/material/styles';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../services/firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {theme} from './theme.js';

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
  </svg>
);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError(email === '');
    setPasswordError(password === '');

    if (email && password) {
      setIsLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCredential.user);
        toast.success("Login successful!");
        navigate('/');
      } catch (error) {
        console.error('Login error:', error.message);
        toast.error("Login failed. Please check your credentials.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('Google sign in successful:', result.user);
      toast.success("Google login successful!");
      navigate('/');
    } catch (error) {
      console.error('Google login error:', error);
      toast.error("Google login failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((show) => !show);
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container 
        component="main" 
        maxWidth="xs" 
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
              Sign In
            </Typography>
            
            <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
              Welcome back! Please enter your details
            </Typography>
            
            {/* Google Sign In*/}
            <Button
              fullWidth
              variant="outlined"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              startIcon={<GoogleIcon />}
              sx={{
                mb: 3,
                py: 1.5,
                fontSize: '1rem',
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#757575',
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)',
                }
              }}
            >
              {isGoogleLoading ? 'Signing in...' : 'Sign in with Google'}
            </Button>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              width: '100%', 
              mb: 3 
            }}>
              <Divider sx={{ flexGrow: 1 }} />
              <Typography variant="body2" color="textSecondary" sx={{ px: 2 }}>
                OR
              </Typography>
              <Divider sx={{ flexGrow: 1 }} />
            </Box>
            
            {/* Normal Sign In */}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helperText={emailError && 'Email is required'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: theme.palette.text.secondary }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                helperText={passwordError && 'Password is required'}
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
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 1 }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Link
                  component="button"
                  type="button" 
                  variant="body2" 
                  color="secondary"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </Link>
              </Box>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled={isLoading}
                sx={{ 
                  mt: 2, 
                  mb: 3,
                  py: 1.5,
                  fontSize: '1rem'
                }}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="textSecondary" display="inline">
                  Don't have an account?{' '}
                </Typography>
                <Link href="/register" variant="body2" color="secondary">
                  Sign Up
                </Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}