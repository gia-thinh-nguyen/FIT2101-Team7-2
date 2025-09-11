import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const UserSchema = new Schema(
  {
    clerkId:  { type: String, unique: true, required: true },
    name: { type: String, trim: true, required: true },
    email:     { type: String, trim: true, lowercase: true, unique: true, required: true },
    role:      { type: String, enum: ['student', 'teacher'], required: true },

    // optional studentProfile reference
    studentProfileId: { type: Schema.Types.ObjectId, ref: 'StudentProfile' },
  }
);


export default models.User || model('User', UserSchema);
