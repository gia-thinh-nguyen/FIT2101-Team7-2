import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const AssignmentSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    //enum grade (P,F, not graded)
    grade: { type: String, enum: ['P', 'F', 'not graded'], required: true },
  }
);

export default models.Assignment || model('Assignment', AssignmentSchema);
