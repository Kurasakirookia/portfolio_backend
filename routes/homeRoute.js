// routes/homeRoute.js
const express = require("express");
const router = express.Router();
const { getSkills,getExperiences, getProjects ,getGraphics} = require("../controllers/homeRouteController");

// Public route to get skills
router.get("/skills", getSkills);
router.get("/experiences",getExperiences);
router.get("/projects",getProjects)
router.get("/graphics",getGraphics)

module.exports = router;
