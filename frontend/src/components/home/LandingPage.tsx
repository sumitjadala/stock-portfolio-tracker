
import './LandingPage.css';
import { Box, Container, Typography, Stack, Grid, Card, CardContent, Button, Skeleton } from '@mui/material';
import { Leaderboard, AddCircleOutline, Assessment } from '@mui/icons-material';
import { featureData } from './data';
import TransactionModal from '../transactions/TransactionModal';
import { useState, useEffect } from 'react';
import { fetchTransactions } from '../api/transactions-api';
import { auth } from '../../../firebase';
import { Link } from 'react-router-dom';

interface StatCardProps {
    title: string;
    value: string;
    isLoading: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, isLoading }) => (
    <Card variant="outlined" sx={{ flex: 1, p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">{title}</Typography>
        {isLoading ? (
            <Skeleton variant="text" sx={{ fontSize: 'h6', mt: 0.5 }} />
        ) : (
            <Typography variant="h6" fontWeight="bold">{value}</Typography>
        )}
    </Card>
);

const LandingPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadInitialData = async () => {
            setIsLoading(true);
            try {
                const user = auth.currentUser;
                if (!user) {
                    setIsLoading(false);
                    return;
                }
                const token = await user.getIdToken();
                const data = await fetchTransactions(token);
                setTransactions(data);
            } catch (err: any) {
                console.error("Failed to load dashboard data:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        loadInitialData();
    }, []);

    const totalPortfolioValue = transactions.reduce(
        (sum, tx) => sum + (tx.transactionAmount || 0),
        0
    );
    const holdingsCount = new Set(transactions.map(tx => tx.stockSymbol)).size;

    return (
        <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
            <Container maxWidth="md" sx={{ textAlign: 'center', py: 5 }}>
                <Box sx={{ mb: 6 }}>
                    <Box sx={{ display: 'inline-flex', p: 1.5, backgroundColor: 'rgba(0, 123, 255, 0.1)', borderRadius: '50%', mb: 2 }}><Leaderboard fontSize="large" color="primary" /></Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>Welcome to Your Portfolio</Typography>
                    <Typography variant="body1" color="text.secondary">Start building your investment portfolio by adding your first transaction. Track your<br />holdings, monitor performance, and make informed investment decisions.</Typography>
                </Box>
                <Grid container spacing={3} justifyContent="center" alignItems="stretch" sx={{ mt: 6 }}>
                    {featureData.map((feature, idx) => (
                        <Grid item xs={12} md={4} key={idx}>
                            <Card
                                component={Link}
                                to="/dashboard"
                                variant="outlined"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    '&:hover': {
                                        boxShadow: 3,
                                        borderColor: 'primary.main'
                                    },
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1, p: 3, textAlign: 'center' }}>
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

                <Card sx={{
                    p: 4,
                    borderRadius: 4,
                    color: 'white',
                    background: 'linear-gradient(90deg, #4338ca, #6d28d9)',
                    mb: 6,
                    mt: 5
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
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add Your First Transaction
                    </Button>
                </Card>

                <Card variant="outlined" sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                        Here's what your dashboard will look like:
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                        <StatCard
                            title="Total Portfolio Value"
                            value={`$${totalPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                            isLoading={isLoading}
                        />
                        <StatCard
                            title="Total Gain/Loss"
                            value="$0.00"
                            isLoading={isLoading}
                        />
                        <StatCard
                            title="Holdings"
                            value={String(holdingsCount)}
                            isLoading={isLoading}
                        />
                    </Stack>
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
                <TransactionModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </Container>


        </Box>
    );
};

export default LandingPage;
