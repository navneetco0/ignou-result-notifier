"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareIgnouAssignmentStatus = void 0;
const lodash_1 = __importDefault(require("lodash"));
const student_model_1 = __importDefault(require("../models/student.model"));
const send_email_controller_1 = require("./send-email.controller");
const utils_1 = require("../utils");
const assignment_status_model_1 = __importDefault(require("../models/assignment-status.model"));
const compareIgnouAssignmentStatus = async (student_id) => {
    try {
        const student = await student_model_1.default.findById(student_id);
        if (!student) {
            return null;
        }
        const data = await (0, utils_1.assignmentStatusExtractor)(student.enrollment_no, student.programme_code);
        const assignment = await assignment_status_model_1.default
            .findOne({ student_id })
            .lean();
        if (!assignment?._id) {
            await assignment_status_model_1.default.create({
                student_id,
                ...data,
            });
        }
        else {
            await assignment_status_model_1.default.findByIdAndUpdate(assignment._id, {
                ...data,
            }, { new: true });
        }
        const prev_assignment_statuses = assignment?.assignment_status?.map(({ _id, ...rest }) => rest) || [];
        if (lodash_1.default.isEqual(lodash_1.default.sortBy(prev_assignment_statuses, "course_code"), lodash_1.default.sortBy(data.assignment_status, "course_code")))
            return null;
        const new_grade_card = lodash_1.default.differenceWith(data.assignment_status, prev_assignment_statuses, lodash_1.default.isEqual);
        const mail_html = (0, utils_1.assignmentStatusMergeHtml)(prev_assignment_statuses, new_grade_card);
        await (0, send_email_controller_1.sendEmail)(student.email, mail_html);
    }
    catch (error) {
        console.error("Error fetching data:", error.message);
        return null;
    }
};
exports.compareIgnouAssignmentStatus = compareIgnouAssignmentStatus;
//# sourceMappingURL=compare-ignou-assignment-status.controller.js.map