import React, { useState } from 'react';
import { Box, Container, Typography, Card, TextField, Button, Stack, ToggleButtonGroup, ToggleButton, Link, Alert } from '@mui/material';
import { auth } from '../../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebase';

type AuthMode = 'login' | 'signup';

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showReset, setShowReset] = useState(false);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: AuthMode | null,
  ) => {
    if (newMode !== null) {
      setMode(newMode);
      setError(null);
    }
  };

  const handleAuthAction = async () => {
    setError(null);

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();

        await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullName: fullName,
            email: user.email,
            phoneNumber: phoneNumber,
          }),
        });
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const handlePasswordReset = async () => {
    setError(null);
    if (!email) {
      setError("Please enter your email to receive a reset link.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('A password reset link has been sent to your email.'); // Simple confirmation
      setShowReset(false); // Hide the reset form
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #f0f4f8 0%, #ffffff 100%)',
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Portfolio Tracker
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your investments with confidence
          </Typography>
        </Box>

        <Card sx={{ p: 4, borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>

          {showReset ? (
            <Stack spacing={3}>
              <Typography variant="h5" component="h2">Reset Password</Typography>
              <Typography color="text.secondary">Enter your email to receive a reset link</Typography>
              <TextField label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
              {error && <Alert severity="error">{error}</Alert>}
              <Button variant="contained" size="large" onClick={handlePasswordReset}>Send Reset Link</Button>
              <Button variant="text" onClick={() => { setShowReset(false); setError(null); }}>Cancel</Button>
            </Stack>
          ) : (
            <Stack spacing={3}>
              <Typography variant="h5" component="h2">Welcome</Typography>
              <ToggleButtonGroup value={mode} exclusive onChange={handleModeChange} fullWidth>
                <ToggleButton value="login">Login</ToggleButton>
                <ToggleButton value="signup">Sign Up</ToggleButton>
              </ToggleButtonGroup>
              {mode === 'signup' && (
                <>
                  <TextField label="Full Name" variant="outlined" fullWidth value={fullName} onChange={(e) => setFullName(e.target.value)} sx={{ mb: 2 }} />
                  <TextField label="Phone Number" variant="outlined" fullWidth value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </>
              )}
              <TextField label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField label="Password" type="password" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />

              {mode === 'signup' && (
                <TextField label="Confirm Password" type="password" variant="outlined" fullWidth value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              )}

              {error && <Alert severity="error">{error}</Alert>}

              <Button variant="contained" size="large" onClick={handleAuthAction}>
                {mode === 'login' ? 'Sign In' : 'Sign Up'}
              </Button>

              <Link href="#" onClick={(e) => { e.preventDefault(); setShowReset(true); }} sx={{ textAlign: 'center' }}>
                Forgot Password?
              </Link>
            </Stack>
          )}
        </Card>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
          Your data is securely stored and managed
        </Typography>
      </Container>
    </Box>
  );
};

export default AuthPage;
