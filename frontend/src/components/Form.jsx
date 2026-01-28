import { Typography, TextField, Button, Box, Paper, Autocomplete, InputLabel, FormControl, TextareaAutosize } from "@mui/material";
import { useState, useEffect } from "react";
import ReCaptchaV2 from 'react-google-recaptcha';
import reclamationApi from "../API/reclamationApi";
import universityApi from "../API/university";
import { toast } from "react-toastify";

function Form() {
    const [universities, setUniversities] = useState([]);
    const [formData, setFormData] = useState({
        university: null,
        details: "",
        studentName: "",
        phoneNumber: "",
        email: "",
    });

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const res = await universityApi.getAllUniversities();
                setUniversities(res.data);
            } catch (err) {
                setUniversities([]);
            }
        };

        fetchUniversities()
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await reclamationApi.createReclamation(formData);
            toast.success(response.data.message);
        } catch(err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Paper
                elevation={6}
                sx={{
                    p: { xs: 3, sm: 4, md: 6 },
                    width: { xs: '100%', sm: 450, md: 900 },
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                    bgcolor: "#fff",
                }}>
                <Typography
                    variant="h5"
                    component="h1"
                    gutterBottom
                    align="center"
                    sx={{
                        fontWeight: 'bold',
                        color: '#000',
                        fontSize: { xs: '1.4rem', sm: '1.6rem', md: '1.8rem' },
                        mb: { xs: 2, sm: 3 }
                    }}
                >
                    Semnalează o problemă
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Autocomplete
                        disablePortal
                        options={universities}
                        getOptionLabel={(option) => option.name}
                        onChange={(e, value) => {
                            setFormData((prev) => ({ ...prev, university: value }))
                        }}
                        value={formData.university}
                        name="university"
                        sx={{
                            '& .MuiAutocomplete-option': {
                                fontSize: { xs: '1rem', sm: '1.05rem' },
                            },
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="În ce universitate ai sesizat problema?"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                        color: '#000',
                                        mb: 1,
                                        '&.Mui-focused': { color: '#000' },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: '#000',
                                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                        padding: { xs: '10px 12px', sm: '12px 14px', md: '14px 16px' },
                                    },
                                }}
                            />
                        )}
                    />
                    <TextField
                        label="Detalii"
                        name="details"
                        multiline
                        minRows={6}
                        maxRows={10}
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                        sx={{
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                            '& .MuiInputBase-input': {
                                padding: { xs: '10px', sm: '12px', md: '14px' },
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                lineHeight: 1.5,
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                color: '#000',
                                mb: 1,
                                '&.Mui-focused': { color: '#000' },
                            },
                        }}
                    />
                    <Typography
                        fontWeight="bold"
                        variant="body2"
                        gutterBottom
                        align="center"
                        sx={{
                            color: '#000',
                            pt: { XS: 2, sm: 4, md: 6 },
                        }}
                    >
                        Opțional, ne poți lăsa numele și numărul tău de telefon/adresa de
                        mail pentru a putea să luăm legătura cu tine.
                    </Typography>
                    <Typography
                        fontWeight="bold"
                        variant="body2"
                        gutterBottom
                        align="center"
                        sx={{
                            color: '#000',
                            mb: { xs: 2, sm: 3 },
                        }}
                    >
                        Te încurajăm să ne lași datele de contact, întrucât în acest mod
                        putem solicita informații suplimentare, dacă e cazul, pentru a înțelege
                        mai bine cazul și a acționa pentru rezolvarea problemelor sesizate. De
                        asemenea, ne ajută datele de contact pentru a putea oferi informații despre
                        stadiul demersurilor noastre și rezultatul acestora. Informațiile oferite sunt
                        confidențiale și transmiterea lor presupune acordul pentru utilizarea acestora
                        de ANOSR pentru contactarea ta.
                    </Typography>
                    <TextField
                        variant="outlined"
                        label="Numele complet"
                        name="studentName"
                        type="text"
                        fullWidth
                        margin="normal"
                        value={formData.studentName}
                        onChange={handleChange}
                        sx={{
                            '& .MuiInputLabel-root': {
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                color: '#000',
                                mb: 1,
                                '&.Mui-focused': { color: '#000' },
                            },
                            '& .MuiInputBase-input': {
                                color: '#000',
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                padding: { xs: '10px 12px', sm: '12px 14px', md: '14px 16px' },
                            },
                        }}
                    />
                    <TextField
                        variant="outlined"
                        label="Număr de telefon"
                        name="phoneNumber"
                        type="tel"
                        fullWidth
                        margin="normal"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        sx={{
                            '& .MuiInputLabel-root': {
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                color: '#000',
                                mb: 1,
                                '&.Mui-focused': { color: '#000' },
                            },
                            '& .MuiInputBase-input': {
                                color: '#000',
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                padding: { xs: '10px 12px', sm: '12px 14px', md: '14px 16px' },
                            },
                        }}
                    />
                    <TextField
                        variant="outlined"
                        label="Adresă de mail"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                        sx={{
                            '& .MuiInputLabel-root': {
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                color: '#000',
                                mb: 1,
                                '&.Mui-focused': { color: '#000' },
                            },
                            '& .MuiInputBase-input': {
                                color: '#000',
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                padding: { xs: '10px 12px', sm: '12px 14px', md: '14px 16px' },
                            },
                        }}
                    />
                    <ReCaptchaV2
                        sitekey={import.meta.env.VITE_CAPTCHA_KEY}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={{
                            mt: { xs: 2, sm: 3 },
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                            background: "#000000"
                        }}
                    >
                        Trimite sesizarea
                    </Button>
                </form>
            </Paper>
        </Box >
    )
}

export default Form;