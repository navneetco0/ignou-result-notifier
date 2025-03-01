"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const GradeCardSchema = new mongoose_1.default.Schema({
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
const StudentGradeCardSchema = new mongoose_1.default.Schema({
    university: { type: String, required: true },
    status_date: { type: String, required: true },
    current_date: { type: String, required: true },
    student_id: { type: mongoose_1.default.Schema.Types.ObjectId },
    programme_code: { type: String, required: true },
    student_name: String,
    grade_card: [GradeCardSchema]
});
exports.default = mongoose_1.default.model('StudentGradeCard', StudentGradeCardSchema);
//# sourceMappingURL=student-grade-card.model.js.map