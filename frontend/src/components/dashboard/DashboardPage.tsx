import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Paper, Card, CardHeader, CardContent, Stack, Container } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PieChartIcon from '@mui/icons-material/PieChart';

import { fetchTransactions } from '../api/transactions-api';
import { auth } from '../../../firebase';
import { useModalStore } from '../store/modalStore';
import { StatCard } from './StatCard';
import { HoldingsTable } from './HoldingsTable';
import { EmptyState } from './EmptyState';
import { PerformanceChart } from './PerformanceChart';
import { AllocationPieChart } from './AllocationPieChart';
import { useTransactionStore } from '../store/transactionStore';

const DashboardPage = () => {
  const { openTransactionModal } = useModalStore();
  const { refreshKey } = useTransactionStore();
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
  }, [refreshKey]);

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
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={3}>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(3, 1fr)',
            },
          }}
        >
          <StatCard
            title="Portfolio Value"
            value={`$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            icon={<AttachMoneyIcon color="action" />}
            isLoading={isLoading}
          />
          <StatCard
            title="Total Gain/Loss"
            value="$0.00"
            icon={<ShowChartIcon color="action" />}
            isLoading={isLoading}
            color="#4caf50"
          />
          <StatCard
            title="Holdings"
            value={String(totalHoldings)}
            icon={<PieChartIcon color="action" />}
            isLoading={isLoading}
          />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: '1fr',
              lg: '2fr 1fr',
            },
          }}
        >
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardHeader title="Portfolio Performance" subheader="Historical value over time" />
            <CardContent>
              <PerformanceChart />
            </CardContent>
          </Card>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardHeader title="Asset Allocation" subheader="Distribution by holdings" />
            <CardContent>
              <AllocationPieChart />
            </CardContent>
          </Card>
        </Box>

        <Card variant="outlined">
          <CardHeader
            title="Your Holdings"
            subheader="A detailed view of your individual transactions"
          />
          <CardContent>
            <HoldingsTable transactions={transactions} />
          </CardContent>
        </Card>

      </Stack>
    </Container>
  );

};

export default DashboardPage;
