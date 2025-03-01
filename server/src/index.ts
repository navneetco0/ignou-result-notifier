import { connectToDatabase } from "./configs";
import cron from "node-cron";
import { checkForChanges } from "./controllers";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

connectToDatabase();


cron.schedule("*/5 * * * * * *", checkForChanges);

console.log("⏳ Monitoring started. Checking for updates every 5 minutes...");

app.get("/", (req, res) => {
    res.send("Cron job is running...");
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});