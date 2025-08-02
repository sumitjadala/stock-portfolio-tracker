import React, { useState } from 'react';
import { Box, Container, Typography, Card, TextField, Button, Stack, ToggleButtonGroup, ToggleButton, Link } from '@mui/material';

// Define the possible modes for our component. This is better than using simple strings.
type AuthMode = 'login' | 'signup';

const AuthPage = () => {
  // State to manage whether we are in 'login' or 'signup' mode
  const [mode, setMode] = useState<AuthMode>('login');
  
  // State to control the visibility of the "Reset Password" form
  // This directly implements your request to use a state condition to show/hide this part.
  const [showReset, setShowReset] = useState(false);

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: AuthMode | null,
  ) => {
    if (newMode !== null) {
      setMode(newMode);
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
        {/* Main Title */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Portfolio Tracker
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your investments with confidence
          </Typography>
        </Box>

        {/* Main Form Card */}
        <Card sx={{ p: 4, borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          
          {/* ----- CONDITIONAL RENDERING FOR RESET PASSWORD FORM ----- */}
          {/* If showReset is true, we display the reset form. */}
          {showReset ? (
            <Box>
              <Typography variant="h6" fontWeight="bold">Reset Password</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Enter your email to receive a reset link
              </Typography>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
              />
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  onClick={() => setShowReset(false)} // This button hides the reset form
                  sx={{ color: 'text.primary', borderColor: 'grey.400' }}
                >
                  Cancel
                </Button>
                <Button fullWidth variant="contained" sx={{ backgroundColor: '#1A2027', '&:hover': { backgroundColor: '#333' } }}>
                  Send Reset Link
                </Button>
              </Stack>
            </Box>
          ) : (
            /* ----- CONDITIONAL RENDERING FOR LOGIN/SIGNUP FORM ----- */
            /* If showReset is false, we display the main login/signup area. */
            <Box>
              <Typography variant="h6" fontWeight="bold">Welcome</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Sign in to your account or create a new one
              </Typography>

              {/* Login/Sign Up Toggle */}
              <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={handleModeChange}
                fullWidth
                sx={{ mb: 2 }}
              >
                <ToggleButton value="login">Login</ToggleButton>
                <ToggleButton value="signup">Sign Up</ToggleButton>
              </ToggleButtonGroup>

              {/* Form Fields */}
              <TextField fullWidth label="Email" variant="outlined" margin="dense" />
              <TextField fullWidth label="Password" type="password" variant="outlined" margin="dense" />
              
              {/* This is a simple example of conditional content based on the 'mode' state */}
              {mode === 'signup' && (
                <TextField fullWidth label="Confirm Password" type="password" variant="outlined" margin="dense" />
              )}

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 2, py: 1.5, backgroundColor: '#1A2027', '&:hover': { backgroundColor: '#333' } }}
              >
                {mode === 'login' ? 'Sign In' : 'Sign Up'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Link 
                  component="button" 
                  variant="body2" 
                  onClick={() => setShowReset(true)} // This link shows the reset form
                  sx={{ textDecoration: 'none' }}
                >
                  Forgot Password?
                </Link>
              </Box>
            </Box>
          )}
        </Card>

        {/* Footer Text */}
        <Typography variant="caption" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
          Your data is securely stored and managed
        </Typography>
      </Container>
    </Box>
  );
};

export default AuthPage;
