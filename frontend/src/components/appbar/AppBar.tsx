import { Box, Typography, Stack } from '@mui/material';
import { Leaderboard, AccountCircle } from '@mui/icons-material';

// Renamed the component to AppBar
const AppBar = () => {
    return (
        <Box
            component="header"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: '12px 24px',
                backgroundColor: 'white',
                borderBottom: '1px solid #e0e0e0',
            }}
        >
            <Leaderboard sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>Portfolio Tracker</Typography>
            <Stack direction="row" alignItems="center" spacing={1}><AccountCircle sx={{ color: 'text.secondary' }} /><Typography>sdsafasd</Typography></Stack>
        </Box>
    );
};

export default AppBar;
