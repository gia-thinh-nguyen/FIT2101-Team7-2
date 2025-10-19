import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const reactionBuckets = {
  like:      { type: [String], default: [] },
  love:      { type: [String], default: [] },
  insightful:{ type: [String], default: [] },
  question:  { type: [String], default: [] },
};

const CommentSchema = new Schema({
  authorId:   { type: String, required: true },   // Clerk user id
  authorName: { type: String, required: true },
  content:    { type: String, required: true, trim: true },
  reactions:  { type: Map, of: [String], default: reactionBuckets },
  replies:    { type: [Object], default: [] },    // shallow nesting
}, { timestamps: true });

const ForumPostSchema = new Schema({
  authorId:   { type: String, required: true },
  authorName: { type: String, required: true },
  title:      { type: String, required: true, trim: true },
  content:    { type: String, required: true },
  course:     { type: String },
  tags:       { type: [String], default: [] },
  reactions:  { type: Map, of: [String], default: reactionBuckets },
  comments:   { type: [CommentSchema], default: [] },
}, { timestamps: true });

ForumPostSchema.index({ title: 'text', content: 'text', tags: 1, course: 1, authorName: 1 });

const ForumPost = models.ForumPost || model('ForumPost', ForumPostSchema);
export default ForumPost;
