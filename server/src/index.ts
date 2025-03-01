import { connectToDatabase } from "./configs";
import cron from "node-cron";
import { checkForChanges } from "./controllers";

connectToDatabase();

cron.schedule("*/5 * * * *", checkForChanges);

console.log("⏳ Monitoring started. Checking for updates every 5 seconds...");