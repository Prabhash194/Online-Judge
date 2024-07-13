import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import 'react-toastify/dist/ReactToastify.css'
import ProblemProvider from './components/problems/problemProvider.jsx'
import ContestProvider from './components/contests/contestProvider.jsx'
import { AuthProvider } from './AuthContext.jsx'

const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
  },
});

const root=ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
 <AuthProvider>
  <ProblemProvider>
  <ContestProvider>
  <ThemeProvider theme={theme}>
  <CssBaseline />
    <App />
    </ThemeProvider>
    </ContestProvider>
    </ProblemProvider>
</AuthProvider>
  </BrowserRouter>
  </React.StrictMode>,
);
