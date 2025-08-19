
const express = require("express");
const upload = require("../middleware/uploadMiddelware");
const router = express.Router();
const { getSingleSkill,addSkill, updateSkill, deleteSkill,addExperience, updateExperience, deleteExperience, addProject, updateProject, deleteProject,addGraphic,updateGraphic,deleteGraphic, getSingleExperience, getSingleGraphic, getSingleProject } = require("../controllers/adminRouteController");
const auth = require("../middleware/authMiddelware");

router.use(auth);
router.get("/skills/:id", getSingleSkill);
router.post("/skills",upload.any(), addSkill);
router.put("/skills/:id",upload.any(), updateSkill);
router.delete("/skills/:id", deleteSkill);

router.get("/experiences/:id", getSingleExperience);
router.post("/experiences",upload.single("logoSrc"),addExperience);
router.put("/experiences/:id",upload.single("logoSrc"),updateExperience);
router.delete("experiences/:id",deleteExperience)

router.get("/projects/:id",getSingleProject)
router.post("/projects",upload.single("img"),addProject);
router.put("/projects/:id",upload.single("img"),updateProject);
router.delete("/projects/:id",deleteProject);

router.get("/graphics/:id", getSingleGraphic);
router.post("/graphics",upload.single("imageSrc"),addGraphic);
router.put("/graphics/:id",upload.single("imageSrc"),updateGraphic);
router.delete("/graphics/:id",deleteGraphic);

module.exports = router;
