import React, { useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Tooltip,
    Menu,
    MenuItem,
    Stack
} from '@mui/material';
import {
    Leaderboard,
    AccountCircle,
    Logout
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';
import { signOut } from 'firebase/auth';
import { useUserStore } from '../store/userStore';

const AppBar = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { profile } = useUserStore();

    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleMenuClose();
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <Box
            component="header"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: '12px 24px',
                backgroundColor: 'white',
                borderBottom: '1px solid #e0e0e0',
            }}
        >
            <Leaderboard sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                Portfolio Tracker
            </Typography>

            <Tooltip title="Account settings">
                <IconButton onClick={handleMenuOpen} color="inherit" size="small">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <AccountCircle />
                        {profile && <Typography variant="body2">{profile.fullName}</Typography>}                    </Stack>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleLogout}>
                    <Logout sx={{ mr: 1 }} fontSize="small" />
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default AppBar;
