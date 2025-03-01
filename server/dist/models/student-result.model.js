"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ResultSchema = new mongoose_1.default.Schema({
    course_code: { type: String, required: true },
    marks: { type: Number, required: true },
    max_marks: { type: Number, required: true },
    month_year: { type: String, required: true },
    date_of_updation: { type: String, required: true },
    remarks: { type: String, default: '' }
});
const StudentResultSchema = new mongoose_1.default.Schema({
    university: { type: String, required: true },
    status_date: { type: String, required: true },
    current_date: { type: String, required: true },
    student_id: { type: mongoose_1.default.Schema.Types.ObjectId },
    programme_code: { type: String, required: true },
    type: { type: String, required: true, unique: true },
    results: [ResultSchema]
});
exports.default = mongoose_1.default.model('StudentResult', StudentResultSchema);
//# sourceMappingURL=student-result.model.js.map