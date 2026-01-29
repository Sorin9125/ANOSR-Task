import { useState, Activity, useContext } from 'react';
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer'
import { Box, Typography, Button } from '@mui/material';
import Form from './components/Form/Form';
import SubmitedForm from './components/Form/SubmitedForm';
import AppContext from './Context/AppContext';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const { isDarkTheme } = useContext(AppContext);

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        mx="auto"
        my={3}
        py={20}
        px={5}
        maxWidth={{ xs: "100%", sm: "30vw", md: "60vw", }}
      >
        <Typography variant='h1' color={isDarkTheme ? "#fff" : "#000"}>
          Te confrunţi cu o problemă în universitatea ta?
        </Typography>
        <br />
        <Typography variant="body1" color={isDarkTheme ? "#fff" : "#000"} sx={{ width: "100%" }} >
          Unul dintre obiectivele ANOSR este de a sprijini studenții în rezolvarea
          problemelor punctuale pe care le întâmpină în universități pentru exercitarea
          drepturilor recunoscute acestora.
        </Typography>
        <br />
        <Typography variant="body1" color={isDarkTheme ? "#fff" : "#000"} sx={{ width: "100%" }}>
          Pe lângă toate demersurile legate de reprezentarea studenților la nivel national,
          de peste 20 ani oferim sfaturi studenților care ne contactează și îi reprezentăm
          în relația cu universitățile și cu Ministerul Educației, astfel încât drepturile
          acestora să fie respectate.
        </Typography>
        <br />
        <Typography variant="body1" color={isDarkTheme ? "#fff" : "#000"} sx={{ width: "100%" }}>
          ANOSR a obținut de-a lungul timpului introducerea a numeroase drepturi în
          Legea educației naționale și în actele normative din sfera învățământului
          superior. După 5 ani de poziții, proteste și negocieri, Codul drepturilor și
          obligațiilor studentului, redactat de ANOSR,  a fost aprobat prin Ordinul
          ministrului educației, cercetării, tineretului și sportului nr. 3666/2012
          ca principalul act normativ care reglementează drepturile și obligațiile
          studentului la nivel național.
        </Typography>
        <br />
        <Typography variant="body1" color={isDarkTheme ? "#fff" : "#000"} sx={{ width: "100%" }}>
          Regăsești Codul drepturilor și obligațiilor studentului accesând butonul de
          mai jos.
        </Typography>
        <br />
        <Typography variant="body1" color={isDarkTheme ? "#fff" : "#000"} sx={{ width: "100%" }}>
          Dacă în vreo situaţie consideri că ţi-au fost încălcate drepturile, povesteşte-ne
          experienţa ta, iar noi te vom contacta pentru a te ajuta la fiecare pas!
        </Typography>
        <Button
          onClick={() => setIsFormOpen(!isFormOpen)}
          sx={{
            color: "#fff",
            background: "#e91e63",
            borderRadius: 2,
            minWidth: { xs: "90%", sm: "12vw", md: "15vw" },
            m: { xs: 2, sm: 4, md: 3 },
            p: { xs: 1.5, sm: 1, md: 2 },
            fontSize: { xs: '1rem', sm: '1.05rem' },
            fontWeight: "bold"
          }}
        >Semnalează o problemă</Button>
        <Activity mode={isFormOpen ? "visible" : "hidden"}>
          {
            isFormSubmited ?
              <SubmitedForm message={"Răspunsul a fost înregistrat cu succes!"} /> :
              <Form
                submitForm={setIsFormSubmited}
                openForm={setIsFormOpen}
              />
          }
        </Activity>
        <Button
          component="a"
          href="/docs/Statutul-Studentului-2019.pdf"
          target="_blank"
          sx={{
            color: "#fff",
            background: "#e91e63",
            borderRadius: 2,
            minWidth: { xs: "90%", sm: "12vw", md: "15vw" },
            p: { xs: 1.5, sm: 1, md: 2 },
            m: { xs: 2, sm: 4, md: 3 },
            fontSize: { xs: '1rem', sm: '1.05rem' },
            fontWeight: "bold",
            textAlign: "center",
            "&:hover": {
              textDecoration: "underline",
            }
          }}
        >Cunoaște-ți drepturile și obligațiile</Button>
      </Box>


      <Footer />
    </>
  )
}

export default App
