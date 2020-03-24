const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var dataSchema = new Schema({
  UUID: { type: String, unique: true },
  createdAt: { type: String },
  fileName: [],
  zipName: { type: String },
  fileContent: { type: String },
  countryNames: { type: String }
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
