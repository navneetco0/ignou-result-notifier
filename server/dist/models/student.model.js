"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const StudentSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true, indexedDB: true },
    name: String,
    programme_code: String,
    enrollment_no: { type: String, required: true, indexedDB: true },
    verified: {
        email: { type: Boolean, default: false },
    },
    requested_result: [String]
}, { timestamps: true });
exports.default = mongoose_1.default.model("students", StudentSchema);
//# sourceMappingURL=student.model.js.map