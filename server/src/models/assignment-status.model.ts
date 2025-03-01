import mongoose from 'mongoose';

const AssignmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course_code: { type: String, required: true },
  session: { type: String, required: true },
  status: { type: String, required: true },
  date: { type: String, required: true },
});

const AssignmentStatusSchema = new mongoose.Schema({
  student_id: {type: mongoose.Schema.Types.ObjectId},
  assignment_status: [AssignmentSchema]
});

export default mongoose.model('AssignmentStatus', AssignmentStatusSchema);
