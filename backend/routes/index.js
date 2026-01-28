const reclamationRouter = require("./reclamation");
const universityRouter = require("./university");
const router = require("express").Router();

router.use("/reclamation", reclamationRouter);
router.use("/university", universityRouter);

module.exports = router;