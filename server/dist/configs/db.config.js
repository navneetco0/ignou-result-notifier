"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectToDatabase = async () => {
    if (!process.env.MONGO_URI)
        throw new Error("MonGO URI is required");
    return await mongoose_1.default
        .connect(process.env.MONGO_URI)
        .then(() => console.log("✅ Connected to MongoDB"))
        .catch((err) => console.error("❌ MongoDB Connection Error:", err));
};
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=db.config.js.map