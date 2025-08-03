import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Paper, Card, CardHeader, CardContent } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import AssessmentIcon from '@mui/icons-material/Assessment';

import { fetchTransactions } from '../api/transactions-api';
import { auth } from '../../../firebase';
import { useModalStore } from '../store/modalStore';

import { StatCard } from './StatCard';
import { HoldingsTable } from './HoldingsTable';
import { EmptyState } from './EmptyState';

const DashboardPage = () => {
  const { openTransactionModal } = useModalStore();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTransactions = async () => {
      setIsLoading(true);
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("No user is logged in.");
        const token = await user.getIdToken();
        const data = await fetchTransactions(token);
        setTransactions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadTransactions();
  }, []);

  const totalValue = transactions.reduce((sum, tx) => sum + (tx.shares * tx.pricePerShare), 0);
  const totalHoldings = new Set(transactions.map(tx => tx.stockSymbol)).size;

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
  }
  if (error) {
    return <Typography color="error" sx={{ p: 3 }}>Error: {error}</Typography>;
  }
  if (transactions.length === 0) {
    return <EmptyState onAddTransaction={openTransactionModal} />;
  }

  return (
    <Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StatCard 
            title="Portfolio Value" 
            value={`$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            icon={<AttachMoneyIcon color="action" />}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard 
            title="Total Gain/Loss" 
            value="$0.00" // Placeholder
            icon={<ShowChartIcon color="action" />}
            isLoading={isLoading}
            color="#4caf50" // Placeholder green
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard 
            title="Holdings" 
            value={totalHoldings}
            icon={<PieChartIcon color="action" />}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
      
      {/* Chart Placeholders */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <Card variant="outlined">
            <CardHeader title="Portfolio Performance" subheader="Historical value over time" />
            <Box sx={{ height: '236px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
                <AssessmentIcon sx={{ mr: 1, fontSize: '2rem' }} />
                <Typography>Performance chart will appear here.</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card variant="outlined">
            <CardHeader title="Asset Allocation" subheader="Distribution by holdings" />
            <Box sx={{ height: '236px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
                <PieChartIcon sx={{ mr: 1, fontSize: '2rem' }} />
                <Typography>Allocation pie chart will appear here.</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
      
      {/* Holdings Table */}
      <Card variant="outlined">
        <CardHeader 
            title="Your Holdings"
            subheader="A detailed view of your individual transactions"
        />
        <CardContent>
            <HoldingsTable transactions={transactions} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardPage;
