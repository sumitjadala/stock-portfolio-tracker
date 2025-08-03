import { Typography, Button, Paper } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BarChartIcon from '@mui/icons-material/BarChart';

interface EmptyStateProps {
  onAddTransaction: () => void;
}

export const EmptyState = ({ onAddTransaction }: EmptyStateProps) => {
  return (
    <Paper 
      variant="outlined" 
      sx={{ p: 4, textAlign: 'center', backgroundColor: '#f9fafb' }}
    >
      <BarChartIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
      <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
        Welcome to Your Portfolio
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3, maxWidth: '500px', mx: 'auto' }}>
        You haven't added any transactions yet. Add your first stock to begin tracking your portfolio performance and making data-driven investment decisions.
      </Typography>
      <Button 
        variant="contained" 
        startIcon={<AddCircleOutlineIcon />}
        onClick={onAddTransaction}
      >
        Add Your First Transaction
      </Button>
    </Paper>
  );
};
