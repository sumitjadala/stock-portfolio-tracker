
import './LandingPage.css';
import { Box, Container, Typography, Stack, Grid, styled, Paper, Card, CardContent, Button } from '@mui/material';
import { Leaderboard, AccountCircle, AddCircleOutline, Assessment } from '@mui/icons-material';
import { featureData } from './data';

interface StatCardProps {
  title: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <Card variant="outlined" sx={{ flex: 1, p: 2, textAlign: 'center' }}>
    <Typography variant="body2" color="text.secondary">{title}</Typography>
    <Typography variant="h6" fontWeight="bold">{value}</Typography>
  </Card>
);

const LandingPage = () => {
    return (
        <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
            {/* <Box component="nav" sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: 'white', borderBottom: '1px solid #e0e0e0' }}>
                <Leaderboard sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>Portfolio Tracker</Typography>
                <Stack direction="row" alignItems="center" spacing={1}><AccountCircle sx={{ color: 'text.secondary' }} /><Typography>sdsafasd</Typography></Stack>
            </Box> */}

            <Container maxWidth="md" sx={{ textAlign: 'center', py: 5 }}>
                <Box sx={{ mb: 6 }}>
                    <Box sx={{ display: 'inline-flex', p: 1.5, backgroundColor: 'rgba(0, 123, 255, 0.1)', borderRadius: '50%', mb: 2 }}><Leaderboard fontSize="large" color="primary" /></Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>Welcome to Your Portfolio</Typography>
                    <Typography variant="body1" color="text.secondary">Start building your investment portfolio by adding your first transaction. Track your<br />holdings, monitor performance, and make informed investment decisions.</Typography>
                </Box>
                <Grid container spacing={3} justifyContent="center" alignItems="stretch">
                    {featureData.map((feature, idx) => (
                        <Grid item xs={12} md={4} key={idx}>
                            <Card className="db-card" variant="outlined">
                                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                                    {feature.icon}
                                    <Typography variant="h6" gutterBottom>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>


                {/* Call to Action Card */}
                <Card sx={{
                    p: 4,
                    borderRadius: 4,
                    color: 'white',
                    background: 'linear-gradient(90deg, #4338ca, #6d28d9)',
                    mb: 6 // margin bottom to space it out
                }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Ready to start investing?
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
                        Add your first stock transaction to begin tracking your portfolio<br />
                        performance and making data-driven investment decisions.
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddCircleOutline />}
                        sx={{
                            backgroundColor: 'white',
                            color: '#4338ca',
                            '&:hover': { backgroundColor: '#f0f0f0' },
                            borderRadius: '999px',
                            px: 3,
                            py: 1.5,
                            textTransform: 'none',
                            fontWeight: 'bold'
                        }}
                    >
                        Add Your First Transaction
                    </Button>
                </Card>

                {/* Dashboard Preview Card (from the new screenshot) */}
                <Card variant="outlined" sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                        Here's what your dashboard will look like:
                    </Typography>
                    {/* Stat Cards Section */}
                    <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                        <StatCard title="Total Portfolio Value" value="$0.00" />
                        <StatCard title="Total Gain/Loss" value="$0.00" />
                        <StatCard title="Holdings" value="0" />
                    </Stack>
                    {/* Chart Placeholder */}
                    <Box sx={{
                        p: 5,
                        backgroundColor: '#f9fafb',
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'text.disabled'
                    }}>
                        <Assessment sx={{ fontSize: 60, mb: 1 }} />
                        <Typography>Your portfolio charts will appear here</Typography>
                    </Box>
                </Card>
            </Container>


        </Box>
    );
};

export default LandingPage;
