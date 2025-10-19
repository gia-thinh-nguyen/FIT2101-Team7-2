import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const reactionBuckets = {
  like: { type: [String], default: [] },
  love: { type: [String], default: [] },
  insightful: { type: [String], default: [] },
  question: { type: [String], default: [] },
};

const CommentSchema = new Schema({
  authorId:   { type: String, required: true },   // Clerk user id
  authorName: { type: String, required: true },
  content:    { type: String, required: true, trim: true },
  reactions:  { type: Map, of: [String], default: reactionBuckets },
  replies:    { type: [Object], default: [] },    // shallow nesting
}, { timestamps: true });

const ForumThreadSchema = new Schema({
  // 🔗 Course link
  courseIdStr: { type: String, required: true },            // e.g. "MAT1830"
  courseRef:   { type: Schema.Types.ObjectId, ref: 'Course', required: true },

  // Thread info
  authorId:   { type: String, required: true },
  authorName: { type: String, required: true },
  title:      { type: String, required: true, trim: true },
  content:    { type: String, required: true },
  tags:       { type: [String], default: [] },

  // Interactions
  reactions:  { type: Map, of: [String], default: reactionBuckets },
  comments:   { type: [CommentSchema], default: [] },
}, { timestamps: true });

ForumThreadSchema.index({
  courseIdStr: 1,
  title: 'text',
  content: 'text',
  tags: 1,
  authorName: 1
});

const ForumThread = models.ForumThread || model('ForumThread', ForumThreadSchema);
export default ForumThread;
