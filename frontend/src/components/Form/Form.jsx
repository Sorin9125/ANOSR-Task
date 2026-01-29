import { Typography, TextField, Button, Paper, Autocomplete, Box } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import ReCaptchaV2 from 'react-google-recaptcha';
import reclamationApi from "../../API/reclamationApi";
import universityApi from "../../API/university";
import { toast } from "react-toastify";
import AppContext from "../../Context/AppContext";

function Form({ submitForm, openForm }) {
    const [universities, setUniversities] = useState([]);
    const [formData, setFormData] = useState({
        university: null,
        details: "",
        studentName: "",
        phoneNumber: "",
        email: "",
    });
    const { isDarkTheme } = useContext(AppContext);

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
            openForm(false);
            submitForm(true);
            toast.success(response.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <Box
            sx={{
                p: { xs: 3, sm: 4, md: 6 },
                width: { xs: '100%', sm: 450, md: 900 },
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                bgcolor: isDarkTheme ? "#000" : "#fff",
            }}>
            <Typography
                variant="h5"
                component="h1"
                gutterBottom
                align="center"
                sx={{
                    fontWeight: 'bold',
                    color: isDarkTheme ? "#fff" : '#000',
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
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },

                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: isDarkTheme ? "#fff" : '#000',
                                    },

                                    '&:hover fieldset': {
                                        borderColor: isDarkTheme ? "#fff" : '#000',
                                    },

                                    '&.Mui-focused fieldset': {
                                        borderColor: isDarkTheme ? "#fff" : '#000',
                                        borderWidth: 2,
                                    },
                                },

                                '& .MuiInputBase-input': {
                                    padding: { xs: '10px', sm: '12px', md: '14px' },
                                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                    lineHeight: 1.5,
                                    color: isDarkTheme ? "#fff" : '#000',
                                },

                                '& .MuiInputLabel-root': {
                                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                    color: isDarkTheme ? "#fff" : '#000',
                                    '&.Mui-focused': { color: isDarkTheme ? "#fff" : '#000' },
                                },
                            }}
                        />
                    )}
                />
                <TextField
                    label="Povestește-ne, oferind cât mai multe detailii, ce problemă ai întâmpinat"
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

                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: isDarkTheme ? "#fff" : '#000',
                            },

                            '&:hover fieldset': {
                                borderColor: isDarkTheme ? "#fff" : '#000',
                            },

                            '&.Mui-focused fieldset': {
                                borderColor: isDarkTheme ? "#fff" : '#000',
                                borderWidth: 2,
                            },
                        },

                        '& .MuiInputBase-input': {
                            padding: { xs: '10px', sm: '12px', md: '14px' },
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                            lineHeight: 1.5,
                            color: isDarkTheme ? "#fff" : '#000',
                        },

                        '& .MuiInputLabel-root': {
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                            color: isDarkTheme ? "#fff" : '#000',
                            '&.Mui-focused': { color: isDarkTheme ? "#fff" : '#000' },
                        },
                    }}
                />
                <Typography
                    fontWeight="bold"
                    variant="body2"
                    gutterBottom
                    align="center"
                    sx={{
                        color: isDarkTheme ? "#fff" : '#000',
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
                        color: isDarkTheme ? "#fff" : '#000',
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
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    maxWidth={{ xs: "100%", sm: 400, md: 300 }}
                    mx="auto"
                >
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
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },

                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: isDarkTheme ? "#fff" : '#000',
                                },

                                '&:hover fieldset': {
                                    borderColor: isDarkTheme ? "#fff" : '#000',
                                },

                                '&.Mui-focused fieldset': {
                                    borderColor: isDarkTheme ? "#fff" : '#000',
                                    borderWidth: 2,
                                },
                            },

                            '& .MuiInputBase-input': {
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                lineHeight: 1.5,
                                color: isDarkTheme ? "#fff" : '#000',
                            },

                            '& .MuiInputLabel-root': {
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                color: isDarkTheme ? "#fff" : '#000',
                                '&.Mui-focused': { color: isDarkTheme ? "#fff" : '#000' },
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
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },

                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: isDarkTheme ? "#fff" : '#000',
                                },

                                '&:hover fieldset': {
                                    borderColor: isDarkTheme ? "#fff" : '#000',
                                },

                                '&.Mui-focused fieldset': {
                                    borderColor: isDarkTheme ? "#fff" : '#000',
                                    borderWidth: 2,
                                },
                            },

                            '& .MuiInputBase-input': {
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                lineHeight: 1.5,
                                color: isDarkTheme ? "#fff" : '#000',
                            },

                            '& .MuiInputLabel-root': {
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                color: isDarkTheme ? "#fff" : '#000',
                                '&.Mui-focused': { color: isDarkTheme ? "#fff" : '#000' },
                            },
                        }}
                    />
                    <TextField
                        variant="outlined"
                        label="Adresa de mail"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                        sx={{
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },

                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: isDarkTheme ? "#fff" : '#000',
                                },

                                '&:hover fieldset': {
                                    borderColor: isDarkTheme ? "#fff" : '#000',
                                },

                                '&.Mui-focused fieldset': {
                                    borderColor: isDarkTheme ? "#fff" : '#000',
                                    borderWidth: 2,
                                },
                            },

                            '& .MuiInputBase-input': {
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                lineHeight: 1.5,
                                color: isDarkTheme ? "#fff" : '#000',
                            },

                            '& .MuiInputLabel-root': {
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                color: isDarkTheme ? "#fff" : '#000',
                                '&.Mui-focused': { color: isDarkTheme ? "#fff" : '#000' },
                            },
                        }}
                    />
                    <Box
                        sx={{
                            mt: 2,
                            transform: {
                                xs: "scale(0.85)",
                                sm: "scale(1)",
                            },
                            transformOrigin: "center",
                        }}>
                        <ReCaptchaV2
                            key={isDarkTheme ? 'recaptcha-dark' : 'recaptcha-light'}
                            sitekey={import.meta.env.VITE_CAPTCHA_KEY}
                            theme={isDarkTheme ? 'dark' : 'light'}
                            onChange={(token) => {
                                setFormData((prev) => ({ ...prev, token }));
                            }}
                            onExpire={() => {
                                setFormData((prev) => ({ ...prev, token: null }));
                            }}
                        />
                    </Box>


                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={{
                            mt: { xs: 2, sm: 2 },
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                            background: isDarkTheme ? "#000" : '#fff',
                            color: isDarkTheme ? "#fff" : '#000',
                            border: "2px solid",
                            borderColor: isDarkTheme ? "#fff" : '#000',
                        }}
                    >
                        Trimite sesizarea
                    </Button>
                </Box>

            </form>
        </Box>
    )
}

export default Form;