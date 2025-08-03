import './App.css'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DashboardPage from './components/dashboard/DashboardPage';
import AuthPage from './components/auth/AuthPage';
import { Box, CircularProgress } from '@mui/material';
import AppBar from './components/appbar/AppBar';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import LandingPage from './components/home/LandingPage';
import { useUserStore } from './components/store/userStore';
import TransactionModal from './components/transactions/TransactionModal';
import { useModalStore } from './components/store/modalStore';

const ProtectedRoute = ({ user }: { user: User | null }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

const AppLayout = () => {
  const { isTransactionModalOpen, closeTransactionModal } = useModalStore();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          backgroundColor: '#f4f6f8', 
          p: 3,
          paddingTop: '80px' 
        }}
      >
        <Outlet />
      </Box>

      <TransactionModal
        open={isTransactionModalOpen}
        onClose={closeTransactionModal}
      />
    </Box>
  );
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { fetchUserProfile, clearUserProfile } = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUserProfile(currentUser.uid);
      } else {
        clearUserProfile();
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [fetchUserProfile, clearUserProfile]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} 
        />

        <Route element={<ProtectedRoute user={user} />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/home" element={<LandingPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
