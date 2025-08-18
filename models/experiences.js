const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  logoSrc: {
    type: String, // Path to logo (e.g., "/uploads/company_logo.png")
    required: false
  },
  startDate: {
    type: Date,
    required: false
  },
  endDate: {
    type: Date,
    required: false
  },
}, { timestamps: true });

module.exports = mongoose.model("Experience", experienceSchema);
