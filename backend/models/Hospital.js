const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  mobile: { type: String, required: true },  // Mobile is required
  // Other fields...
});

const HospitalModel = mongoose.model('Hospital', hospitalSchema);

module.exports = HospitalModel;
