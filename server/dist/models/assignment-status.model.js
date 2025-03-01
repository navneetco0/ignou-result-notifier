"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AssignmentSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    course_code: { type: String, required: true },
    session: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: String, required: true },
});
const AssignmentStatusSchema = new mongoose_1.default.Schema({
    student_id: { type: mongoose_1.default.Schema.Types.ObjectId },
    assignment_status: [AssignmentSchema]
});
exports.default = mongoose_1.default.model('AssignmentStatus', AssignmentStatusSchema);
//# sourceMappingURL=assignment-status.model.js.map