import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface HoldingsTableProps {
  transactions: any[];
}

export const HoldingsTable = ({ transactions }: HoldingsTableProps) => {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead sx={{ backgroundColor: '#f9fafb' }}>
          <TableRow>
            <TableCell>Stock</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="right">Shares</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>
                <Typography fontWeight="bold">{tx.stockSymbol}</Typography>
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }}>{tx.type}</TableCell>
              <TableCell align="right">{tx.shares}</TableCell>
              <TableCell align="right">${tx.pricePerShare.toFixed(2)}</TableCell>
              <TableCell align="right">${tx.transactionAmount}</TableCell>
              <TableCell align="right">{new Date(tx.date).toLocaleDateString()}</TableCell>
              <TableCell align="center">
                <IconButton size="small" aria-label="edit">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" aria-label="delete">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
