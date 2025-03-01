import { getIgnouResult } from "./get-ignou-results.contrller";

export const checkForChanges = async () => {
    try {
        await getIgnouResult("67c30566242bcf5b515e6396");
    } catch (error) {
        console.log(error);
    }
};