import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import AppContext from "../../Context/AppContext";

function SubmitedForm({ message }) {
    const { isDarkTheme } = useContext(AppContext);
    return (
        <Box
            sx={{
                p: { xs: 3, sm: 4, md: 6 },
                width: { xs: '100%', sm: 450, md: 900 },
                my: { xs: 3, sm:3, md: 2},
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                bgcolor: isDarkTheme ? "#000" : '#fff',
            }}>
            <Typography
                variant="h5"
                align="center"
                sx={{
                    fontWeight: 'bold',
                    color: isDarkTheme ? "#fff" : '#000',
                    fontSize: { xs: '1.4rem', sm: '1.6rem', md: '1.8rem' },
                }}
            >
                {message}
            </Typography>
        </Box >
    )
}

export default SubmitedForm;