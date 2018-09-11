import mongoose, { Schema } from "mongoose"
import nickname from "nickname"

const UserSchema = new Schema({
    nickname: {
        type: String,
        default: nickname.random()
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['leader', 'assist_lead', 'instructor', 'assistant', 'novice'],
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        bcrypt: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})


UserSchema.plugin(require('mongoose-unique-validator'))
UserSchema.plugin(require('mongoose-bcrypt'))

export default mongoose.model('User', UserSchema)