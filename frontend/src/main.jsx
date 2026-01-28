import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material'
import { ToastContainer } from 'react-toastify'

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 700, fontSize: "2.6rem" },
    h2: { fontWeight: 600, fontSize: "1.75rem" },
    h3: { fontWeight: 500, fontSize: "1.5rem" },
    body1: { fontSize: "1.3rem" },
    body2: { fontSize: "0.875rem" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
        },
        a: {
          textDecoration: "none",
          color: "inherit",
        },
      },
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
