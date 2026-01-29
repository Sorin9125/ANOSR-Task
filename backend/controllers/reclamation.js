const { reclamationModel } = require("../models");
const verifyReCaptcha = require("../config/captcha");

const reclamationController = {
    createReclamation: async (req, res) => {
        try {
            const reclamation = {
                university: req.body.university.name,
                details: req.body.details,
                studentName: req.body.studentName,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                token: req.body.token,
            };
            if (!(reclamation.university && reclamation.details)) {
                return res.status(400).json({ message: "Universitatea si detaliile reclamatiei trebuiesc completate" })
            }
            if (reclamation?.studentName && !(/^[A-z ]{3,}$/gm).test(reclamation?.studentName)) {
                return res.status(400).json({ message: "Numele trebuie sa contina doar cifre" });
            }
            if (reclamation?.phoneNumber && !(/^[0-9]{10}$/gm).test(reclamation?.phoneNumber)) {
                return res.status(400).json({ message: "Numarul de telefon nu este valid" });
            }
            if (reclamation?.email && !(/^[A-z1-9.-_]+@[a-z]{1,}.com$/).test(reclamation?.email)) {
                return res.status(400).json({ message: "Adresa de mail este invalida" });
            }
            if(!await verifyReCaptcha(reclamation.token)) {
                return res.status(400).json({ message: "Verificarea cu reCAPTCHA a esuat"});
            }
            await reclamationModel.create(reclamation);
            return res.status(200).json({ message: "Reclamatia a fost inregistrata cu succes!" });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    },
    getAllReclamations: async (req, res) => {
        try {
            const reclamations = await reclamationModel.findAll();
            if (reclamations.length <= 0) {
                return res.status(404).json({ message: "Nu exista reclamatii inregistrate" });
            }
            return res.status(200).json(reclamations);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    },
    getReclamationById: async (req, res) => {
        try {
            const reclamationId = req.params.id;
            const reclamation = await reclamationModel.findByPk(reclamationId);
            if (!reclamation) {
                return res.status(404).json({ message: `Reclamatia cu id-ul ${reclamationId} nu exista` });
            }
            return res.status(200).json(reclamation);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    },
    updateReclamation: async (req, res) => {
        try {
            const reclamationId = req.params.id;
            if (!await reclamationModel.findByPk(reclamationId)) {
                return res.status(404).json({ message: `Reclamatia cu id-ul ${reclamationId} nu exista` });
            }
            const newReclamation = req.body;
            if (!(newReclamation.university && newReclamation.details)) {
                return res.status(400).json({ message: "Universitatea si detaliile reclamatiei trebuiesc completate" })
            }
            if (newReclamation?.studentName && !(/^[A-z ]{3,}$/gm).test(newReclamation?.studentName)) {
                return res.status(400).json({ message: "Numele trebuie sa contina doar cifre" });
            }
            if (newReclamation?.phoneNumber && !(/^[0-9]{10}$/gm).test(newReclamation?.phoneNumber)) {
                return res.status(400).json({ message: "Numarul de telefon nu este valid" });
            }
            if (newReclamation?.email && !(/^[A-z1-9.-_]+@[a-z]{1,}.com$/).test(newReclamation?.email)) {
                return res.status(400).json({ message: "Adresa de mail este invalida" });
            }
            await reclamationModel.update(newReclamation, {
                where: {
                    id: reclamationId,
                }
            });
            return res.status(200).json({ message: `Reclamatia cu id-ul ${reclamationId} a fost actualizata cu succes` });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    },
    deleteReclamation: async (req, res) => {
        try {
            const reclamationId = req.params.id;
            if (!await reclamationModel.findByPk(reclamationId)) {
                return res.status(404).json({ message: `Reclamatia cu id-ul ${reclamationId} nu exista` });
            }
            await reclamationModel.destroy({
                where: {
                    id: reclamationId,
                }
            });
            return res.status(200).json({ message: `Reclamatia cu id-ul ${reclamationId} a fost stearsa cu succes` });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    }
};

module.exports = reclamationController;