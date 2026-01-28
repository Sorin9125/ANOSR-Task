import { Box, Link, Typography } from "@mui/material";

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#323437",
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
                maxWidth="1200px"
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
                    <Link href="#" underline="hover" color="inherit">GDPR - Politica de confidențialitate</Link>
                    <Link href="#" underline="hover" color="inherit">Termeni și condiții</Link>
                    <Link href="#" underline="hover" color="inherit">Cookie Policy</Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer;