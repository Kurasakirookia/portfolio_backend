const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  img: {
    type: String, // store URL or file path
    required: true
  },
  startDate: {
    type: Date,
    // required: true
  },
  endDate: {
    type: Date
  }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;