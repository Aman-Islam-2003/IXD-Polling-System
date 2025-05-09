// models.js
const mongoose = require('mongoose');

// Schema for individual poll responses
const pollResponseSchema = new mongoose.Schema({
  responses: {
    type: Map,
    of: {
      selfTaught: Number,
      schoolTaught: Number
    },
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

// Schema for aggregated poll results by skill
const pollResultsSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: true,
    unique: true
  },
  selfTaughtTotal: {
    type: Number,
    default: 0
  },
  schoolTaughtTotal: {
    type: Number,
    default: 0
  },
  responseCount: {
    type: Number,
    default: 0
  }
});

const PollResponse = mongoose.model('PollResponse', pollResponseSchema);
const PollResults = mongoose.model('PollResults', pollResultsSchema);

module.exports = {
  PollResponse,
  PollResults
};