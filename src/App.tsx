import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ExoplanetsComponent from './components/ExoplanetsComponent';
import CalculationComponent from './components/CalculationComponent';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Stack } from '@mui/material';

const router = createBrowserRouter([
  { index: true, element: <ExoplanetsComponent /> },
  { path: '/calc', element: <CalculationComponent /> }
]);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Stack direction="row" padding={2} spacing={2} sx={{backgroundColor: 'darkslateblue'}}>
        <Button color='secondary' href='/calc'>Add experiment</Button>
        <Button color='secondary' href='/'>Opened exoplanets</Button>
      </Stack>
    <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
