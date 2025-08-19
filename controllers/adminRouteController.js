
const Skill = require("../models/skills");
const Experience=require("../models/experiences")
const Project = require("../models/projects.js");
const Graphic = require("../models/graphics.js");


// @desc   get single skill
// @route  GET/api/admin/skills/:id
// @access Private (later add auth)
// ✅ New - handle multiple files from array

const getSingleSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findById(id);
    
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    
    res.status(200).json(skill);
  } catch (err) {
    console.error("Error fetching skill:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// @desc   Add new skill
// @route  POST /api/admin/skills
// @access Private (later add auth)
// ✅ New - handle multiple files from array
const addSkill = async (req, res) => {
  try {
    console.log('=== DEBUG START ===');
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);
    
    const { skillName, tools } = req.body; // tools is already an array!
    const files = req.files || [];
    
    console.log('Tools from body:', tools);
    
    // Attach file paths to corresponding tools
    files.forEach(file => {
      console.log('Processing file:', file.fieldname, file.filename);
      const match = file.fieldname.match(/tools\[(\d+)\]\[logoSrc\]/);
      if (match) {
        const toolIndex = parseInt(match[1]);
        if (tools[toolIndex]) {
          tools[toolIndex].logoSrc = `/uploads/${file.filename}`;
          console.log(`Attached file to tool ${toolIndex}:`, tools[toolIndex].logoSrc);
        }
      }
    });
    
    const skillData = {
      skillName,
      tools
    };
    
    console.log('Final skillData to save:', JSON.stringify(skillData, null, 2));
    
    const skill = new Skill(skillData);
    const savedSkill = await skill.save();
    
    console.log('Saved skill:', JSON.stringify(savedSkill, null, 2));
    console.log('=== DEBUG END ===');
    
    res.status(201).json(savedSkill);
  } catch (err) {
    console.error("Error adding skill:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// @desc   Update skill
// @route  PUT /api/admin/skills/:id
// @access Private
const updateSkill = async (req, res) => {
  try {
    const { skillName } = req.body;
    const files = req.files || [];
    
    console.log('=== UPDATE SKILL DEBUG ===');
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);
    
    // Parse tools data from nested form fields (same logic as addSkill)
    const tools = [];
    
    // If tools already exist as array in req.body (which they should)
    if (req.body.tools && Array.isArray(req.body.tools)) {
      tools.push(...req.body.tools);
    } else {
      // Fallback: parse from nested form fields
      Object.keys(req.body).forEach(key => {
        if (key.startsWith('tools[')) {
          const match = key.match(/tools\[(\d+)\]\[(\w+)\]/);
          if (match) {
            const [, index, field] = match;
            const toolIndex = parseInt(index);
            
            if (!tools[toolIndex]) tools[toolIndex] = {};
            tools[toolIndex][field] = req.body[key];
          }
        }
      });
    }
    
    // Attach file paths to corresponding tools
    files.forEach(file => {
      console.log('Processing file:', file.fieldname, file.filename);
      const match = file.fieldname.match(/tools\[(\d+)\]\[logoSrc\]/);
      if (match) {
        const toolIndex = parseInt(match[1]);
        if (tools[toolIndex]) {
          tools[toolIndex].logoSrc = `/uploads/${file.filename}`;
          console.log(`Attached file to tool ${toolIndex}:`, tools[toolIndex].logoSrc);
        }
      }
    });
    
    const updateData = {
      skillName,
      tools
    };
    
    console.log('Final update data:', JSON.stringify(updateData, null, 2));
    
    const updated = await Skill.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true, runValidators: true }
    );
    
    if (!updated) {
      return res.status(404).json({ message: "Skill not found" });
    }
    
    console.log('Updated skill:', JSON.stringify(updated, null, 2));
    console.log('=== UPDATE SKILL DEBUG END ===');
    
    res.json(updated);
  } catch (err) {
    console.error("Error updating skill:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Delete skill
// @route  DELETE /api/admin/skills/:id
// @access Private
const deleteSkill = async (req, res) => {
  try {
    const deleted = await Skill.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Skill not found" });
    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    console.error("Error deleting skill:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Experiences_______________________



// @desc   get single experiece
// @route  GET/api/admin/experiences/:id
// @access Private (later add auth)
// ✅ New - handle multiple files from array

const getSingleExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const expereince = await Experience.findById(id);
    
    if (!expereince) {
      return res.status(404).json({ message: "experience not found" });
    }
    
    res.status(200).json(expereince);
  } catch (err) {
    console.error("Error fetching experiece:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// @desc   add Experience 
// @route  POST /api/admin/experiences
// @access Private
const addExperience = async (req, res) => {
  try {
    const { companyName, role, description, startDate, endDate } = req.body;
    const newExperience = new Experience({
      companyName,
      role,
      description,
      logoSrc: req.file ? `/uploads/${req.file.filename}` : undefined,
      startDate,
      endDate
    });
    await newExperience.save();
    res.status(201).json(newExperience);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding experience", error });
  }
};

// @desc   Update Experience
// @route  PUT /api/admin/experiences/:id
// @access Private
const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Prepare update data
    const updateData = { ...req.body };
    
    // Handle file upload if new file is provided
    if (req.file) {
      updateData.logoSrc = `/uploads/${req.file.filename}`;
    }
    
    console.log('Update data:', updateData); // Debug log
    
    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      updateData, // Now includes file path if uploaded
      { new: true, runValidators: true }
    );

    if (!updatedExperience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    console.log('Updated experience:', updatedExperience); // Debug log
    res.status(200).json(updatedExperience);
  } catch (error) {
    console.error('Update error:', error); // Debug log
    res.status(500).json({ message: "Error updating experience", error });
  }
};
// @desc   Delete Experience
// @route  DELETE /api/admin/experiences/:id
// @access Private
const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExperience = await Experience.findByIdAndDelete(id);

    if (!deletedExperience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting experience", error });
  }
};




//Projects ___________________________________________



// @desc   get single project
// @route  GET/api/admin/projects/:id
// @access Private (later add auth)
// ✅ New - handle multiple files from array

const getSingleProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    
    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    
    res.status(200).json(project);
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Add Project
// @route  POST /api/admin/projects
// @access Private
const addProject = async (req, res) => {
  try {
    const { title, link, description, startDate, endDate } = req.body;
    const newProject = new Project({
      title,
      link,
      description,
      img: req.file ? `/uploads/${req.file.filename}` : undefined,
      startDate,
      endDate
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding project", error });
  }
};

// @desc   Update Project
// @route  PUT /api/admin/projects/:id
// @access Private
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Prepare update data
    const updateData = { ...req.body };
    
    // Handle file upload if new file is provided
    if (req.file) {
      updateData.img = `/uploads/${req.file.filename}`;
    }
    
    console.log('Update data:', updateData); // Debug log
    
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      updateData, // Now includes file path if uploaded
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    console.log('Updated project:', updatedProject); // Debug log
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Update error:', error); // Debug log
    res.status(500).json({ message: "Error updating project", error });
  }
};

// @desc   Delete Project
// @route  DELETE /api/admin/projects/:id
// @access Private
const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
};


// ____________graphics



// @desc   get single graphic
// @route  GET/api/admin/graphics/:id
// @access Private (later add auth)
// ✅ New - handle multiple files from array

const getSingleGraphic = async (req, res) => {
  try {
    const { id } = req.params;
    const graphic = await Graphic.findById(id);
    
    if (!graphic) {
      return res.status(404).json({ message: "graphic not found" });
    }
    
    res.status(200).json(graphic);
  } catch (err) {
    console.error("Error fetchinggraphic:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Add a new graphic
// @route  POST /api/admin/graphics
// @access Private

const addGraphic = async (req, res) => {
  try {
    const { name, category } = req.body;
    const newGraphic = new Graphic({
      name,
      category,
      imageSrc: req.file ? `/uploads/${req.file.filename}` : undefined
    });
    await newGraphic.save();
    res.status(201).json(newGraphic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding graphic", error });
  }
};
// @desc   Update graphic
// @route  PUT /api/admin/graphics/:id
// @access Private
const updateGraphic = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Prepare update data
    const updateData = { ...req.body };
    
    // Handle file upload if new file is provided
    if (req.file) {
      updateData.imageSrc = `/uploads/${req.file.filename}`;
    }
    
    console.log('Update data:', updateData); // Debug log
    
    const updatedGraphic = await Graphic.findByIdAndUpdate(
      id,
      updateData, // Now includes file path if uploaded
      { new: true, runValidators: true }
    );

    if (!updatedGraphic) {
      return res.status(404).json({ message: "Graphic not found" });
    }

    console.log('Updated graphic:', updatedGraphic); // Debug log
    res.status(200).json(updatedGraphic);
  } catch (error) {
    console.error('Update error:', error); // Debug log
    res.status(500).json({ message: "Error updating graphic", error });
  }
};
// @desc   Delete graphic
// @route  DELETE /api/admin/graphics/:id
// @access Private
const deleteGraphic = async (req, res) => {
  try {
    const deletedGraphic = await Graphic.findByIdAndDelete(req.params.id);
    if (!deletedGraphic) return res.status(404).json({ message: "Graphic not found" });
    res.status(200).json({ message: "Graphic deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting graphic", error });
  }
};
module.exports = { getSingleSkill,addSkill, updateSkill, deleteSkill ,getSingleExperience,addExperience,updateExperience,deleteExperience,getSingleProject,addProject,updateProject,deleteProject,getSingleGraphic,addGraphic,updateGraphic,deleteGraphic,};
