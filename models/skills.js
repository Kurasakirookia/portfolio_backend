
const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema({
  name: { type: String,
            required: true 
         },   

  role: 
        {   type: String, 
            
         }, 
        
  level: { type: String,  } ,
     // e.g., strong, basic, intermediate
  logoSrc:{ type:String, }
});

const skillSchema = new mongoose.Schema({
  skillName: { type: String, required: true }, // e.g., Web Development, Documentation
  tools: [toolSchema]
});

module.exports = mongoose.model("Skill", skillSchema);
