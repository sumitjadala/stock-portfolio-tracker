import { Box, Container, Typography, Card, CardContent, Grid, Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip } from '@mui/material';
import { TrendingUp, PieChart, MoreHoriz } from '@mui/icons-material';

const StatCard = ({ title, value, detail, detailColor }: { title: string, value: string, detail: string, detailColor?: string }) => (
  <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
    <Typography variant="body2" color="text.secondary">{title}</Typography>
    <Typography variant="h5" fontWeight="bold" sx={{ my: 1 }}>{value}</Typography>
    <Typography variant="body2" sx={{ color: detailColor || 'text.secondary' }}>{detail}</Typography>
  </Card>
);

const PortfolioPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Top Stat Cards */}
        <Grid item xs={12} md={4}>
          <StatCard title="Total Portfolio Value" value="$17,242.50" detail="As of today" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Total Gain/Loss" value="+$15,790.50" detail="+1087.50%" detailColor="success.main" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Holdings" value="1" detail="Different stocks" />
        </Grid>

        {/* Chart Section */}
        <Grid item xs={12} lg={7}>
          <Card variant="outlined" sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6">Portfolio Performance</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Historical value over time</Typography>
            <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb', borderRadius: 2 }}>
                <TrendingUp sx={{ fontSize: 60, color: 'text.disabled' }} />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Card variant="outlined" sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6">Asset Allocation</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Portfolio distribution by holdings</Typography>
            <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb', borderRadius: 2 }}>
                <PieChart sx={{ fontSize: 60, color: 'text.disabled' }} />
            </Box>
          </Card>
        </Grid>

        {/* Holdings Table Section */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Your Holdings</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell align="right">Shares</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{new Date().toLocaleDateString()}</TableCell>
                      <TableCell><Chip label="BUY" color="success" size="small" /></TableCell>
                      <TableCell align="right">121</TableCell>
                      <TableCell align="right">$12.00</TableCell>
                      <TableCell align="right">$1,452.00</TableCell>
                      <TableCell align="right"><MoreHoriz /></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PortfolioPage;
