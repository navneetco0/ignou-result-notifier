"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configs_1 = require("./configs");
const node_cron_1 = __importDefault(require("node-cron"));
const controllers_1 = require("./controllers");
(0, configs_1.connectToDatabase)();
node_cron_1.default.schedule("*/5 * * * *", controllers_1.checkForChanges);
console.log("⏳ Monitoring started. Checking for updates every 5 seconds...");
//# sourceMappingURL=index.js.map