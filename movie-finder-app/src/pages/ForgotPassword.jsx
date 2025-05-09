import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link, 
  Paper,
  Avatar,
  CssBaseline,
  InputAdornment,
  useMediaQuery
} from '@mui/material';
import { ThemeProvider, alpha } from '@mui/material/styles';
import { Email } from '@mui/icons-material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {theme} from './theme.js';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email) {
      setEmailError(true);
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error('Password reset error:', error.message);
      toast.error(error.message || "Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
              <LockResetIcon fontSize="large" />
            </Avatar>
            
            <Typography component="h1" variant="h4" gutterBottom>
              Reset Password
            </Typography>
            
            <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
              {resetSent 
                ? "Check your email for a password reset link"
                : "Enter your email and we'll send you a link to reset your password"}
            </Typography>
            
            {!resetSent ? (
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false);
                  }}
                  error={emailError}
                  helperText={emailError && 'Email is required'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: theme.palette.text.secondary }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />
                
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
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </Box>
            ) : (
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                size="large"
                onClick={() => navigate('/login')}
                sx={{ 
                  mt: 2, 
                  mb: 3,
                  py: 1.5,
                  fontSize: '1rem'
                }}
              >
                Back to Login
              </Button>
            )}
            
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default ForgotPassword;