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
  container: {
    type: String,
    get: n => n.toLowerCase(),
  },
  official_date: {
    type: Date,
    required: true
  },
  training_center: {
    type: Schema.Types.ObjectId,
    ref: 'TrainingCenter',
    required: true
  },
  line_research: {
    type: Schema.Types.ObjectId,
    ref: 'LineResearch',
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
  co_novice: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  novices: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

HotbedSchema.plugin(accessibleRecordsPlugin)

export default mongoose.model('Hotbed', HotbedSchema)
