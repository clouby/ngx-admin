import mongoose, {
  Schema
} from "mongoose"
import {
  accessibleRecordsPlugin
} from "@casl/mongoose"


const HotbedSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  official_date: {
    type: Date,
    required: true
  },
  training_center: {
    type: String,
    required: true
  },
  line_research: {
    type: String,
    enum: ['investigación aplicada'],
    required: true
  },
  leader: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  co_leader: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  novices: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }]
})

HotbedSchema.plugin(accessibleRecordsPlugin)

export default mongoose.model('Hotbed', HotbedSchema)
