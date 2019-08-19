const mongoose = require('mongoose');

const { Schema } = mongoose;

const applicationModel = new Schema(
  {
    name: { type: String },
    url: { type: String },
    configurationId: {
      type: String
    },
    configuration: {
      type: Map,
      of: String
    }
  }
);

module.exports = mongoose.model('application', applicationModel);
