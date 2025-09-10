import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const StudentProfileSchema = new Schema(
    {
        dateEnrolled: { type: Date, required: true },
        status: { type: String, enum: ['active', 'dropped-out'], default: 'active' },
        currentCreditPoints: { type: Number, default: 0 },
        enrolledCourseIds: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
    }
);

export default models.StudentProfile || model('StudentProfile', StudentProfileSchema);