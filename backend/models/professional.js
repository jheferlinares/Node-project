// backend/models/Professional.js
const mongoose = require('mongoose');

const ProfessionalSchema = new mongoose.Schema({
  professionalName: String,
  base64Image: String,
  nameLink: {
    firstName: String,
    url: String
  },
  primaryDescription: String,
  workDescription1: String,
  workDescription2: String,
  linkTitleText: String,
  linkedInLink: {
    text: String,
    link: String
  },
  githubLink: {
    text: String,
    link: String
  }
});

module.exports = mongoose.model('Professional', ProfessionalSchema);
