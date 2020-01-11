const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

var projectSchema = new Schema({
  issue_title: {
    type: String,
    required: true
  },
  issue_text: {
    type: String,
    required: true
  },
  created_by: {
    type: String,
    required: true
  },
  assigned_to: String,
  status_text: String,
  created_on: {
    type: Date,
    required: true
  },
  updated_on: {
    type: Date,
    required: true
  },
  open: Boolean,
  project: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Projects', projectSchema);