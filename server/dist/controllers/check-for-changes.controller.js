"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForChanges = void 0;
const compare_ignou_assignment_status_controller_1 = require("./compare-ignou-assignment-status.controller");
const compare_ignou_grade_controller_1 = require("./compare-ignou-grade.controller");
const get_ignou_results_contrller_1 = require("./get-ignou-results.contrller");
const checkForChanges = async () => {
    try {
        await (0, get_ignou_results_contrller_1.getIgnouResult)("67c30566242bcf5b515e6396");
        await (0, compare_ignou_assignment_status_controller_1.compareIgnouAssignmentStatus)("67c30566242bcf5b515e6396");
        await (0, compare_ignou_grade_controller_1.comapareIgnouGrade)("67c30566242bcf5b515e6396");
    }
    catch (error) {
        console.log(error);
    }
};
exports.checkForChanges = checkForChanges;
//# sourceMappingURL=check-for-changes.controller.js.map