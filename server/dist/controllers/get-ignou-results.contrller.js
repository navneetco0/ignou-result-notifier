"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIgnouResult = void 0;
const student_result_model_1 = __importDefault(require("../models/student-result.model"));
const student_model_1 = __importDefault(require("../models/student.model"));
const utils_1 = require("../utils");
const lodash_1 = __importDefault(require("lodash"));
const send_email_controller_1 = require("./send-email.controller");
const getIgnouResult = async (student_id) => {
    try {
        const student = await student_model_1.default.findById(student_id);
        if (!student) {
            return null;
        }
        const url = (0, utils_1.tee_result)(student.enrollment_no, student.requested_result[0]);
        const data = await (0, utils_1.TEEDataExtractor)(url);
        const results = await student_result_model_1.default
            .findOne({ student_id, type: student.requested_result[0] })
            .lean();
        if (results?._id) {
            await student_result_model_1.default.findByIdAndUpdate(results._id, {
                ...data,
            }, { new: true });
        }
        else
            await student_result_model_1.default.create({
                ...data,
                type: student.requested_result[0],
                student_id,
            });
        const prev_result = results?.results?.map(({ _id, ...rest }) => rest) || [];
        if (lodash_1.default.isEqual(lodash_1.default.sortBy(prev_result, "course_code"), lodash_1.default.sortBy(data.results, "course_code")))
            return null;
        const new_result = lodash_1.default.differenceWith(data.results, prev_result, lodash_1.default.isEqual);
        const mail_html = (0, utils_1.teeMergeHtml)(prev_result, new_result);
        await (0, send_email_controller_1.sendEmail)(student.email, mail_html);
    }
    catch (error) {
        console.error("Error fetching data:", error.message);
        return null;
    }
};
exports.getIgnouResult = getIgnouResult;
//# sourceMappingURL=get-ignou-results.contrller.js.map