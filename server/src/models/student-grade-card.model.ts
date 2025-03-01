import mongoose from 'mongoose';

const GradeCardSchema = new mongoose.Schema({
  course_code: { type: String, required: true },
  asgn_1: { type: Number, required: true },
  lab_1: { type: Number, required: true },
  lab_2: { type: Number, required: true },
  lab_3: { type: Number, required: true },
  lab_4: { type: Number, required: true },
  te_theory: { type: Number, required: true },
  te_practical: { type: Number, required: true },
  status: { type: String, required: true },
});

const StudentGradeCardSchema = new mongoose.Schema({
  university: { type: String, required: true },
  status_date: { type: String, required: true },
  current_date: { type: String, required: true },
  student_id: {type: mongoose.Schema.Types.ObjectId},
  programme_code: { type: String, required: true },
  student_name: String,
  grade_card: [GradeCardSchema]
});

export default mongoose.model('StudentGradeCard', StudentGradeCardSchema);
