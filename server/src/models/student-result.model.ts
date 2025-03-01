import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
  course_code: { type: String, required: true },
  marks: { type: Number, required: true },
  max_marks: { type: Number, required: true },
  month_year: { type: String, required: true },
  date_of_updation: { type: String, required: true },
  remarks: { type: String, default: '' }
});

const StudentResultSchema = new mongoose.Schema({
  university: { type: String, required: true },
  status_date: { type: String, required: true },
  current_date: { type: String, required: true },
  student_id: {type: mongoose.Schema.Types.ObjectId},
  programme_code: { type: String, required: true },
  type: { type: String, required: true, unique: true },
  results: [ResultSchema]
});

export default mongoose.model('StudentResult', StudentResultSchema);
