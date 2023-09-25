import React from 'react';
import '../../css/loading.css'
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const defaultTheme = createTheme();

export const Loading = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className='loading'> </div>
        </Box>
      </Container>
    </ThemeProvider>
  )
}