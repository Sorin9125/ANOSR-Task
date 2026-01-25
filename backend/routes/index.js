const reclamationRouter = require("./reclamation");
const router = require("express").Router();

router.use("/reclamation", reclamationRouter);

module.exports = router;