const { universityController } = require("../controllers");
const router = require("express").Router();

router.post("/", universityController.createUniversity);
router.post("/bulk", universityController.createBulkUniversities);
router.get("/", universityController.getAllUniversities);
router.put("/:id", universityController.updateUniversity);
router.delete("/:id", universityController.deleteUniversity);

module.exports = router;