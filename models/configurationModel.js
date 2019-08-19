const mongoose = require('mongoose');

const {
  Schema
} = mongoose;

const configurationAttributeModel = new Schema(
  {
    name: { type: String },
    type: { type: String },
    multiValued: { type: Boolean, default: false },
    description: { type: String },
    // schema: { type: String },
    readonly: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    caseExact: { type: Boolean, default: false },
    canonicalValues: [{ type: String }],
    canonicalValuesDB: { type: String },
    subAttributes: [{ type: String }],
    blType: { type: String },
    blCodeList: { type: String },
    blMinValue: { type: String },
    blMaxValue: { type: String },
    blValidationPattern: { type: String },
    uiType: { type: String },
    uiSubType: { type: String },
    uiOrdinal: { type: String }
  }
);

const configurationModel = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  attributes: [configurationAttributeModel]
});

module.exports = mongoose.model('configuration', configurationModel);