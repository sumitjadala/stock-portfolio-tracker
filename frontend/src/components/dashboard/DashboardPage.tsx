import './DashboardPage.css';
// src/components/dashboard/DashboardPage.tsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Card, CardContent } from '@mui/material';
import TransactionModal from '../transactions/TransactionModal';
import { fetchTransactions } from '../api/transactions-api';
import { auth } from '../../../firebase';

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error("No user is logged in.");
        }
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">Dashboard</Typography>
        <Button 
          variant="contained" 
          onClick={() => setIsModalOpen(true)}
        >
          Add Transaction
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>My Transactions</Typography>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box>
          {transactions.length === 0 ? (
            <Typography>You have no transactions yet. Add one to get started!</Typography>
          ) : (
            transactions.map(tx => (
              <Card key={tx.id} variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{tx.stockSymbol} - <span style={{ textTransform: 'capitalize' }}>{tx.type}</span></Typography>
                  <Typography color="text.secondary">
                    {tx.shares} shares @ ${tx.pricePerShare.toFixed(2)} each on {new Date(tx.date).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      )}

      <TransactionModal 
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
};

export default DashboardPage;

