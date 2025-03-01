"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configs_1 = require("./configs");
const node_cron_1 = __importDefault(require("node-cron"));
const controllers_1 = require("./controllers");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
(0, configs_1.connectToDatabase)();
node_cron_1.default.schedule("*/5 * * * *", controllers_1.checkForChanges);
console.log("⏳ Monitoring started. Checking for updates every 5 seconds...");
app.get("/", (req, res) => {
    res.send("Cron job is running...");
});
// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map