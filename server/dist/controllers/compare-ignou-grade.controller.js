"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comapareIgnouGrade = void 0;
const student_grade_card_model_1 = __importDefault(require("../models/student-grade-card.model"));
const student_model_1 = __importDefault(require("../models/student.model"));
const utils_1 = require("../utils");
const lodash_1 = __importDefault(require("lodash"));
const send_email_controller_1 = require("./send-email.controller");
const comapareIgnouGrade = async (student_id) => {
    try {
        const student = await student_model_1.default.findById(student_id);
        if (!student) {
            return null;
        }
        const url = (0, utils_1.grade_card_url)(student.enrollment_no, student.programme_code);
        const data = await (0, utils_1.gradeCardDataExtractor)(url);
        const grade_card = await student_grade_card_model_1.default
            .findOne({ student_id, programme_code: student.programme_code })
            .lean();
        if (!grade_card?._id) {
            await student_grade_card_model_1.default.create({
                student_id,
                ...data,
            });
        }
        else {
            await student_grade_card_model_1.default.findByIdAndUpdate(grade_card._id, {
                ...data,
            }, { new: true });
        }
        const prev_grade_card = grade_card?.grade_card?.map(({ _id, ...rest }) => rest) || [];
        if (lodash_1.default.isEqual(lodash_1.default.sortBy(prev_grade_card, "course_code"), lodash_1.default.sortBy(data.grade_card, "course_code")))
            return null;
        const new_grade_card = lodash_1.default.differenceWith(data.grade_card, prev_grade_card, lodash_1.default.isEqual);
        const mail_html = (0, utils_1.gradeCardMergeHtml)(prev_grade_card, new_grade_card);
        await (0, send_email_controller_1.sendEmail)(student.email, mail_html);
    }
    catch (error) {
        console.error("Error fetching data:", error.message);
        return null;
    }
};
exports.comapareIgnouGrade = comapareIgnouGrade;
//# sourceMappingURL=compare-ignou-grade.controller.js.map