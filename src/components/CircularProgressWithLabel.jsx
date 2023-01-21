import * as React from 'react';
import {Typography,Box,CircularProgress} from '@mui/material'

export function CircularProgressWithLabel({progress,...props}) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography fontSize={12} variant="caption" component="div" color="black">
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
