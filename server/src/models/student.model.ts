import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, indexedDB: true },
    name: String,
    programme_code: String,
    enrollment_no: { type: String, required: true, indexedDB: true },
    verified: {
        email: { type: Boolean, default: false },
    },
    requested_result: [String]
  },
  { timestamps: true }
);

export default mongoose.model("students", StudentSchema);
