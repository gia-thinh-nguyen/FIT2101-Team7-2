import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    email:     { type: String, trim: true, lowercase: true, unique: true, required: true },
    role:      { type: String, enum: ['student', 'teacher'], required: true },

    // optional studentProfile reference
    studentProfileId: { type: Schema.Types.ObjectId, ref: 'StudentProfile' },
  },
  { timestamps: true, versionKey: false }
);


export default models.User || model('User', UserSchema);
