import mongoose, {
  Schema
} from "mongoose"
import {
  accessibleRecordsPlugin
} from "@casl/mongoose"

const schema = new Schema({
  name: {
    type: String,
    unique: true,
    uniqueCaseInsensitive: true,
    required: true
  }
})

schema.plugin(accessibleRecordsPlugin)
schema.plugin(require('mongoose-unique-validator'))

export const LineResearch = mongoose.model('LineResearch', schema);
export const TrainingCenter = mongoose.model('TrainingCenter', schema);
