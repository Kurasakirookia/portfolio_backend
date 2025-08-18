const mongoose = require("mongoose");

const graphicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "general",
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Graphic = mongoose.model("Graphic", graphicSchema);

module.exports = Graphic;