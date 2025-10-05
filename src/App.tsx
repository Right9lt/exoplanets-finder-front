import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './components/Landing';
import CalculationComponent from './components/CalculationComponent';

const router = createBrowserRouter([
  { index: true, element: <Landing /> },
  { path: '/calc', element: <CalculationComponent /> }
])
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
