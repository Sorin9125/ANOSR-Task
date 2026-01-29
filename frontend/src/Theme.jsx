import { CssBaseline, createTheme, ThemeProvider } from '@mui/material'
import { useContext } from 'react'
import AppContext from './Context/AppContext.jsx'


function Theme({ children }) {
    const { isDarkTheme } = useContext(AppContext);
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
                        backgroundColor: isDarkTheme ? "#151515" : "#f5f5f5",
                    },
                    a: {
                        textDecoration: "none",
                        color: "inherit",
                    },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export default Theme