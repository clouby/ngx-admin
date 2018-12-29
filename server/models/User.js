import mongoose, {
  Schema
} from "mongoose"
import nickname from "nickname"

const UserSchema = new Schema({
  nickname: {
    type: String,
    default: nickname.random()
  },
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  mobile_phone: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    enum: ['leader', 'supp_lead', 'co_leader', 'assistant', 'novice'],
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false,
    bcrypt: true
  },
  token_reset_password: {
    type: String
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

// Include modules for password crypting and unique validator
UserSchema.plugin(require('mongoose-unique-validator'))
UserSchema.plugin(require('mongoose-bcrypt'))

// Make a virtual set about `fullName`
UserSchema.virtual('fullName').get(function () {
  const {
    first,
    last
  } = this.name;
  return `${first} ${last}`;
})

export default mongoose.model('User', UserSchema)
