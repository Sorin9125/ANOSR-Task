const { universityModel } = require("../models");

const universityController = {
    createUniversity: async (req, res) => {
        try {
            const university = req.body;
            if (!university.name) {
                return res.status(400).json({ message: "Universitatea trebuie sa aiba un nume" });
            }
            if (!(/^[A-zăîâșțĂÎÂȘȚ ]{3,}$/gm).test(university.name)) {
                return res.status(400).json({ message: "Numele universitatii trebuie sa contina doar litere" });
            }
            await universityModel.create(university);
            return res.status(200).json({ message: "Universitatea a fost adaugata cu succes" });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    },
    createBulkUniversities: async (req, res) => {
        try {
            const universities = req.body.universities;
            for (let university in universities) {
                if (!(/^[A-zăîâșțĂÎÂȘȚ ]{3,}$/gm).test(university.name)) {
                    return res.status(400).json({ message: "Numele universitatii trebuie sa contina doar litere" });
                }
            }
            await universityModel.bulkCreate(universities);
            return res.status(200).json({ message: "Universitatile au fost adaugate cu succes" });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    },
    getAllUniversities: async (req, res) => {
        try {
            const universities = await universityModel.findAll();
            if (universities.length <= 0) {
                return res.status(404).json({ message: "Nu exista universitati inregistrate" });
            }
            return res.status(200).json(universities);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    },
    updateUniversity: async (req, res) => {
        try {
            const universityId = req.params.id;
            if (!await universityModel.findByPk(universityId)) {
                return res.status(404).json({ message: `Universitatea cu id-ul ${universityId} nu exista` });
            }
            const newUniversity = req.body;
            if (!(/^[A-zăîâșțĂÎÂȘȚ ]{3,}$/gm).test(newUniversity.name)) {
                return res.status(400).json({ message: "Numele universitatii trebuie sa contina doar litere" });
            }
            await universityModel.update(newUniversity, {
                where: {
                    id: universityId,
                }
            });
            return res.status(200).json({ message: `Universitatea cu id-ul ${universityId} a fost actualizata cu succes` });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    },
    deleteUniversity: async (req, res) => {
        try {
            const universityId = req.params.id;
            if (!await universityModel.findByPk(universityId)) {
                return res.status(404).json({ message: `Universitatea cu id-ul ${universityId} nu exista` });
            }
            await universityModel.destroy({
                where: {
                    id: universityId,
                }
            });
            return res.status(200).json({ message: `Universitatea cu id-ul ${universityId} a fost stearsa cu succes` });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    },
};

module.exports = universityController;