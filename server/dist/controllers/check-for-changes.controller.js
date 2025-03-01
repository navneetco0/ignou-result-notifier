"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForChanges = void 0;
const get_ignou_results_contrller_1 = require("./get-ignou-results.contrller");
const checkForChanges = async () => {
    try {
        await (0, get_ignou_results_contrller_1.getIgnouResult)("67c30566242bcf5b515e6396");
    }
    catch (error) {
        console.log(error);
    }
};
exports.checkForChanges = checkForChanges;
//# sourceMappingURL=check-for-changes.controller.js.map