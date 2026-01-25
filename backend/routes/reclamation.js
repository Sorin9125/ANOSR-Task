const router = require("express").Router();
const { reclamationController } = require("../controllers");

router.post("/", reclamationController.createReclamation);
router.get("/", reclamationController.getAllReclamations);
router.get("/:id", reclamationController.getReclamationById);
router.put("/:id", reclamationController.updateReclamation);
router.delete("/:id", reclamationController.deleteReclamation);

module.exports = router;
