// src/components/transactions/TransactionModal.tsx

import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
    Select, MenuItem, FormControl, InputLabel, Stack, IconButton
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import { auth } from '../../../firebase';

interface TransactionModalProps {
    open: boolean;
    onClose: () => void;
}

const TransactionModal = ({ open, onClose }: TransactionModalProps) => {
    const [stock, setStock] = useState('');
    const [transactionType, setTransactionType] = useState('buy');
    const [shares, setShares] = useState('');
    const [price, setPrice] = useState('');
    const [transactionDate, setTransactionDate] = useState<Date | null>(new Date());

    const handleAddTransaction = async () => {
        const user = auth.currentUser;
        if (!user) {
            console.error("No user is logged in. Cannot save transaction.");
            return;
        }
        if (!stock || !shares || !price || !transactionDate) {
            console.error("All fields must be filled out.");
            return;
        }
        try {
            const token = await user.getIdToken();
            const transactionPayload = {
                stockSymbol: stock,
                type: transactionType,
                shares: Number(shares),
                pricePerShare: Number(price),
                date: transactionDate.toISOString(),
            };
            const response = await fetch('http://localhost:3000/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(transactionPayload),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Server responded with ${response.status}`);
            }
            const result = await response.json();
            console.log("Transaction saved successfully via backend:", result);
            onClose();
        } catch (error) {
            console.error("Failed to save transaction:", error);
        }
    };
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Add New Transaction
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={3} sx={{ mt: 2 }}>
                    <TextField
                        label="Stock"
                        placeholder="Search for a stock (e.g., AAPL, Apple)"
                        fullWidth
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Transaction Type</InputLabel>
                        <Select
                            value={transactionType}
                            label="Transaction Type"
                            onChange={(e) => setTransactionType(e.target.value)}
                        >
                            <MenuItem value="buy">Buy</MenuItem>
                            <MenuItem value="sell">Sell</MenuItem>
                        </Select>
                    </FormControl>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            label="Shares"
                            type="number"
                            fullWidth
                            value={shares}
                            onChange={(e) => setShares(e.target.value)}
                        />
                        <TextField
                            label="Price per Share ($)"
                            type="number"
                            fullWidth
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Stack>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Transaction Date"
                            value={transactionDate}
                            onChange={(newValue) => setTransactionDate(newValue)}
                        />
                    </LocalizationProvider>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ p: '16px 24px' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleAddTransaction}>
                    Add Transaction
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TransactionModal;