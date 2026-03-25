import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  username: String,
  text:     String,
}, { timestamps: true });

const postSchema = new mongoose.Schema({
  author:   { type: String, required: true },
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text:     { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  likes:    { type: [String], default: [] },        // array of usernames
  comments: { type: [commentSchema], default: [] },
}, { timestamps: true });

export default mongoose.model('Post', postSchema);