import { compareIgnouAssignmentStatus } from "./compare-ignou-assignment-status.controller";
import { comapareIgnouGrade } from "./compare-ignou-grade.controller";
import { getIgnouResult } from "./get-ignou-results.contrller";

export const checkForChanges = async () => {
    try {
        await getIgnouResult("67c30566242bcf5b515e6396");
        await compareIgnouAssignmentStatus("67c30566242bcf5b515e6396");
        await comapareIgnouGrade("67c30566242bcf5b515e6396");
    } catch (error) {
        console.log(error);
    }
};