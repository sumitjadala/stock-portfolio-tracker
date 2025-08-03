// src/components/dashboard/StatCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  isLoading: boolean;
  color?: string;
}

export const StatCard = ({ title, value, icon, isLoading, color = 'text.primary' }: StatCardProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">{title}</Typography>
          {icon}
        </Box>
        <Box sx={{ mt: 2 }}>
          {isLoading ? (
            <Skeleton variant="text" width="60%" height={32} />
          ) : (
            <Typography variant="h5" component="div" fontWeight="bold" sx={{ color }}>
              {value}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
