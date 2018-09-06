import mongoose, { Schema } from "mongoose"

const CommentSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    text: {
        type: String,
        required: true
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

export default mongoose.model('Comment', CommentSchema)
