// models/Skill.js

//set required afterwards!!!!
const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema({
  name: { type: String,
            required: true 
         },   // e.g., HTML, CSS, React


  role: 
        {   type: String, 
            
         }, 
         // e.g., frontend, backend, version_control
  level: { type: String,  } ,
     // e.g., strong, basic, intermediate
  logoSrc:{ type:String, }
});

const skillSchema = new mongoose.Schema({
  skillName: { type: String, required: true }, // e.g., Web Development, Documentation
  tools: [toolSchema]
});

module.exports = mongoose.model("Skill", skillSchema);
