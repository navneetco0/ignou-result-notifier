"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignment_status_url = exports.grade_card_url = exports.tee_result = void 0;
const tee_result = (enrollment, type) => {
    return `https://termendresult.ignou.ac.in/view_gradecard.aspx?eno=${enrollment}&type=${type}`;
};
exports.tee_result = tee_result;
const grade_card_url = (enrollment, prog) => {
    return `https://gradecard.ignou.ac.in/gradecard/view_gradecard.aspx?eno=${enrollment}&prog=${prog}&type=1`;
};
exports.grade_card_url = grade_card_url;
const assignment_status_url = (enrollment, prog) => {
    return `https://assignmentstatus.ignou.ac.in/view_assignmentstatus.aspx?eno=${enrollment}&prog=${prog}`;
};
exports.assignment_status_url = assignment_status_url;
//# sourceMappingURL=link-gen.utils.js.map