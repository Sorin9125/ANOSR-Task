import { Box, Link, Typography, Switch } from "@mui/material";
import AppContext from "../Context/AppContext";
import { useContext } from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function Footer() {
    const { setIsDarkTheme, isDarkTheme } = useContext(AppContext);
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: isDarkTheme ? "#000" : "#323437",
                color: "#fff",
                py: { xs: 4, md: 6 },
                width: "100%",
            }}
        >
            <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", md: "flex-start" }}
                maxWidth="80vw"
                mx="auto"
                px={{ xs: 3, md: 5 }}
                gap={{ xs: 4, md: 0 }}
            >
                <Box display="flex" flexDirection="column" gap={1}>
                    <Link href="#" underline="hover" color="inherit">Prima pagină</Link>
                    <Link href="#" underline="hover" color="inherit">Adaugă eveniment</Link>
                    <Link href="#" underline="hover" color="inherit">Istoricul protestelor studențești</Link>
                    <Link href="#" underline="hover" color="inherit">Istoric</Link>
                </Box>

                <Box display="flex" flexDirection="column" gap={1}>
                    <Typography variant="h6" sx={{ mb: 1 }}>Alte site-uri ANOSR</Typography>
                    <Link href="#" underline="hover" color="inherit">Profi Tari</Link>
                    <Link href="#" underline="hover" color="inherit">Universități de vară pentru elevi</Link>
                    <Link href="#" underline="hover" color="inherit">6 pentru educație</Link>
                </Box>

                <Box display="flex" flexDirection="column" gap={1}>
                    <Switch
                        checked={isDarkTheme}
                        onChange={() => setIsDarkTheme(!isDarkTheme)}
                        icon={
                            <LightModeIcon
                                sx={{
                                    fontSize: { xs: 22, sm: 25 },
                                    color: "#000000",
                                }}
                            />
                        }
                        checkedIcon={
                            <DarkModeIcon
                                sx={{
                                    fontSize: { xs: 22, sm: 25 },
                                    color: "#ffffff",
                                }}
                            />
                        }
                        sx={{
                            width: { xs: 52, sm: 60 },
                            height: { xs: 30, sm: 34 },
                            padding: 0,

                            "& .MuiSwitch-switchBase": {
                                padding: 0.5,
                                transitionDuration: "300ms",

                                "&.Mui-checked": {
                                    transform: {
                                        xs: "translateX(22px)",
                                        sm: "translateX(26px)",
                                    },
                                },
                            },

                            "& .MuiSwitch-thumb": {
                                width: { xs: 26, sm: 30 },
                                height: { xs: 26, sm: 30 },
                                backgroundColor: isDarkTheme ? "#121212" : "#fff",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            },

                            "& .MuiSwitch-track": {
                                borderRadius: 20,
                                backgroundColor: isDarkTheme ? "#df7373" : "#e0e0e0",
                                opacity: 1,
                                transition: "background-color 300ms",
                            },
                        }}
                    />
                    <Link href="#" underline="hover" color="inherit">GDPR - Politica de confidențialitate</Link>
                    <Link href="#" underline="hover" color="inherit">Termeni și condiții</Link>
                    <Link href="#" underline="hover" color="inherit">Cookie Policy</Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer;