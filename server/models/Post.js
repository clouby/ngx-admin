import mongoose, { Schema } from "mongoose"
import { accessibleRecordsPlugin } from "@casl/mongoose"

const PostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})


PostSchema.plugin(accessibleRecordsPlugin)

export default mongoose.model('Post', PostSchema)
