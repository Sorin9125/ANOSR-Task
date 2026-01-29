import { AppBar, Box, Toolbar, IconButton, Stack, Slide } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useContext } from 'react';
import NavItem from './NavItem';
import AppContext from '../../Context/AppContext';

const navbarPages = [
    { name: "Home" },
    {
        name: "Despre noi",
        children: [
            { name: "Suntem ANOSR!" },
            { name: "Istoric" },
            { name: "Membri ANOSR" },
            { name: "Statut ANOSR" },
            { name: "Biroul de conducere" },
            {
                name: "Comisii ANOSR",
                children: [
                    { name: "Comisia Educțională (EDU)" },
                    { name: "Comisia pentru Proiecte și Dezvoltare (CPD)" },
                    { name: "Comsia de Relații Public (CRP)" },
                    { name: "Comsia de Relații Internaționale (CRI)" },
                    { name: "Comisia Consultativă a Studenților Doctoranzi (CCSD)" },
                ]
            },
            { name: "Comisia de Cenzori" },
            {
                name: "Proiectele ANOSR",
                children: [
                    { name: "We are Next!" },
                    { name: "Gala Profesorului Bologna" },
                    { name: "FOSR" },
                    { name: "TRUST" },
                    { name: "Student Dojo" },
                    { name: "UVE" },
                    { name: "Altele" },
                ]
            }
        ]
    },
    {
        name: "Documente oficiale",
        children: [
            { name: "Publicații, rapoarte și analize" },
            { name: "Poziții, propuneri legislative și politici" },
        ]
    },
    {
        name: "Resurse",
        children: [
            { name: "Articole" },
            { name: "Finanțarea educației" },
            { name: "Burse" },
            { name: "Cazare" },
            { name: "Cantine" },
            { name: "Transport" },
            { name: "Servicii medicale" },
            { name: "Securitate în campusurile universitare" },
            { name: "Tabere" },
            { name: "Procesul Bologna" },
            { name: "Instituții publice" },
            { name: "Asigurarea Calității" },
            { name: "Învățământ Centrat pe Student" },
            { name: "Angajabilitate" },
            { name: "Calificări" },
            { name: "Drepturile studenților" },
            { name: "Mobilități studențești" },
            { name: "Stagii de practică" },
            { name: "Voluntariat" },
            { name: "Etică universitară" },
            { name: "Transparență și buna guvernanță în universități" },
            { name: "Consiliere și orientare în carieră" },
        ]
    },
    {
        name: "Semnalează o problemă",
        children: [
            { name: "Chestionar probleme" },
            { name: "#NOIȘIEI" },
        ]
    },
    {
        name: "Proteste, revendicări și realizări",
        children: [
            {
                name: "2011",
                children: [
                    { name: "17 februarie" },
                    { name: "28 februarie - 6 martie" },
                    { name: "7 - 10 martie" },
                    { name: "17 noiembrie" },
                ]
            },
            {
                name: "2010",
                children: [
                    { name: "11 februarie", },
                    { name: "25 mai", },
                    { name: "20 august", },
                ]
            },
            {
                name: "2009",
                children: [
                    { name: "Rezumat - 2 aprilie" },
                ]
            },
            { name: "2007" },
            {
                name: "2005",
                children: [
                    { name: "26 octombrie" },
                    { name: "7 - 11 noiembrie" },
                ]
            },
            { name: "2003" },
        ]
    },
    {
        name: "Creșterea capacității organizațiilor studențești de a fi stakeholderi activi ai societății civile",
        children: [
            { name: "Informații generale proiect" },
            {
                name: "Direcțiile principale ale proiectului",
                children: [
                    { name: "Demersurile desfășurate în cadrul acțiunii Dezvoltarea unui sistem de watchdog la nivel local pentru organizațiile studențești" },
                    { name: "Demersurile desfășurate în cadrul acțiunii Influențarea politicilor publice la nivel local" },
                    { name: "Demersurile desfășurate în cadrul acțiunii Creșterea capacității organizațiilor membre prin creșterea transparenței și diversificarea resurselor financiare" },
                    { name: "Demersurile desfășurate în cadrul acțiunii Dezvoltarea managementului resursei umane în organizațiile studențești" },
                    { name: "Demersurile desfășurate în cadrul acțiunii Influențarea politicilor publice la nivel național" },
                ]
            },
            { name: 'Campania Campania „Universități verzi, competitive și incluzive” ' },
            { name: "Sesiuni de formare desfășurate" },
            { name: "Rezultatele proiectului" },
            { name: "Materiale elaborate" },
            { name: "Nu ai acces la date cu caracter public din universitatea ta?" },
            { name: "Rapoarte de activitate" },
            { name: "Planul strategic ANOSR" },
            { name: "Anunțuri achiziții publice" },
        ]
    },
    {
        name: "Campanii",
        children: [
            { name: 'Campania „Noi știm ce vrem, dar cine își asumă?”' },
            {
                name: "Cum au schimbat studenții lumea",
                children: [
                    { name: "Protestele din Serbia" },
                    { name: "Momente istorice" },
                    { name: "5% pentru educație " },
                    { name: "Diploma Degeaba" },
                    { name: "25% și înmormântarea educației" },
                    { name: "OCUPPY" },
                ]
            }
        ]
    },
    { name: "Contact" },
]

function Navbar() {
    const [mobileMenuAnchor, setMobileMenuAnchor] = useState(false);
    const navbarHeight = 60;
    const { isDarkTheme } = useContext(AppContext);

    return (
        <AppBar position="fixed" sx={{ bgcolor: isDarkTheme ? "#000" : "#fff", boxShadow: 1 }}>
            <Toolbar sx={{ minHeight: navbarHeight, px: 2, display: "flex", flexDirection: { xs: "row", md: "column" }, justifyContent: "space-between" }}>
                <Box
                    component="a"
                    href="/"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Box
                        component="img"
                        src={isDarkTheme ? "/assets/Logo-ANOSR-alb.png" : "assets/Logo-ANOSR.png"}
                        alt="Logo"
                        sx={{ height: 60, width: "auto" }}
                    />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            flexWrap: { md: "wrap" },
                            minWidth: "auto",
                            gap: 0.6,
                            justifyContent: "space-evenly",
                            width: "100%"
                        }}
                    >
                        {navbarPages.map((page) => (
                            <NavItem key={page.name} page={page} />
                        ))}
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" }, ml: "auto" }}>
                        <IconButton
                            onClick={() => setMobileMenuAnchor(!mobileMenuAnchor)}
                            sx={{ color: isDarkTheme ? "#fff" : "#000" }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

                </Box>
            </Toolbar>

            <Slide direction='left' in={mobileMenuAnchor} mountOnEnter unmountOnExit>
                <Box
                    sx={{
                        position: "fixed",
                        top: navbarHeight,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: "100vw",
                        bgcolor: isDarkTheme ? "#000" : "#fff",
                        zIndex: 1200,
                        boxShadow: 3,
                        overflowY: "auto",
                        px: 1
                    }}
                >
                    <Stack spacing={0} alignItems="flex-start">
                        {navbarPages.map((page) => (
                            <NavItem
                                key={page.name}
                                page={page}
                                isMobile
                            />
                        ))}
                    </Stack>
                </Box>
            </Slide>
        </AppBar >
    );
}
export default Navbar;