import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', //Reference to User model
            required: true,
        },
    },{ timestamps: true } 
);

const Post = mongoose.model('Post', postSchema);

export default Post;