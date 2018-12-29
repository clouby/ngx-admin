import mongoose, {
  Schema
} from "mongoose";

const TokenSchema = new Schema({
  provider: {
    type: String,
    unique: true,
  },
  refresh_token: {
    type: String
  },
})

// Includes the module for pretty object when the trigger show an error.
TokenSchema.plugin(require('mongoose-unique-validator'))


export default mongoose.model('Token', TokenSchema);
