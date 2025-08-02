import './App.css'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import LandingPage from './components/home/LandingPage';
import DashboardPage from './components/dashboard/DashboardPage';
import PortfolioPage from './components/portfolio/PortfolioPage';
import { Box } from '@mui/material';
import AppBar from './components/appbar/AppBar';
import AuthPage from './components/auth/AuthPage';

const AppLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar />
      <Box component="main" sx={{ flexGrow: 1, backgroundColor: '#f4f6f8', p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
