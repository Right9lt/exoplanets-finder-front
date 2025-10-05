import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const PercentageIndicatorComponent:React.FC<{value: number, label: string}> = ({ value, label = "Probability" }) => {
  // Ensure value is between 0 and 1
  const normalizedValue = Math.max(0, Math.min(1, value));
  const percentage = (normalizedValue * 100).toFixed(2);
  

  const getColor = (val: number) => {
    if (val < 0.3) return '#f44336'; 
    if (val < 0.5) return '#ff9800'; 
    if (val < 0.7) return '#ffc107'; 
    if (val < 0.85) return '#4caf50';
    return '#2196f3'; 
  };
  
  const color = getColor(normalizedValue);
  
  return (
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            color: color,
            fontWeight: 'bold',
            mr: 1
          }}
        >
          {percentage}%
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {label}
        </Typography>
      </Box>
      
      <LinearProgress 
        variant="determinate" 
        value={normalizedValue * 100}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: '#e0e0e0',
          '& .MuiLinearProgress-bar': {
            backgroundColor: color,
            borderRadius: 5,
          }
        }}
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          0%
        </Typography>
        <Typography variant="caption" color="text.secondary">
          100%
        </Typography>
      </Box>
    </Box>
  );
};
 export default PercentageIndicatorComponent;