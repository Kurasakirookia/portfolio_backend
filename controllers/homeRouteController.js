// controllers/homeRouteController.js
const Skill = require("../models/skills");
const Experience = require("../models/experiences");
const Project=require("../models/projects.js");
const Graphic = require("../models/graphics.js");

// @desc   Get all skills
// @route  GET /api/skills
// @access Public
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    console.error("Error fetching skills:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET all experiences
const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Error fetching experiences", error });
  }
};


//Get all projects 
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ startDate: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};


//___________graphics
const getGraphics = async (req, res) => {
  try {
    const graphics = await Graphic.find().sort({ uploadedAt: -1 });
    res.status(200).json(graphics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching graphics", error });
  }
};

module.exports = { getSkills,getExperiences,getProjects, getGraphics};
