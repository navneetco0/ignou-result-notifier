"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlDataExtractor = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const htmlDataExtractor = async (url) => {
    try {
        // Fetch the HTML content
        const { data } = await axios_1.default.get(url);
        const $ = cheerio.load(data);
        // Extract university name
        const university = $("#ctl00_lbl_title").text();
        // Extract other details
        const status_date = $("#ctl00_ContentPlaceHolder1_lblTEEasondt")
            .text();
        const current_date = $("#ctl00_ContentPlaceHolder1_lblcurr_date")
            .text()
            .replace("Current Date: ", "")
            .trim();
        const enrolment_no = $("#ctl00_ContentPlaceHolder1_lblDispEnrolno")
            .text()
            .trim();
        const programme_code = $("#ctl00_ContentPlaceHolder1_lblDispProgCode")
            .text()
            .trim();
        // Extract results table
        let results = [];
        $("#ctl00_ContentPlaceHolder1_gvDetail tr").each((index, element) => {
            const cols = $(element).find("td");
            if (cols.length >= 5 && $(cols[0]).text().trim()) {
                results.push({
                    course_code: $(cols[0]).text().trim(),
                    marks: +$(cols[1]).text().trim(),
                    max_marks: +$(cols[2]).text().trim(),
                    month_year: $(cols[3]).text().trim(),
                    date_of_updation: $(cols[4]).text().trim(),
                    remarks: $(cols[5]) ? $(cols[5]).text().trim() : ""
                });
            }
        });
        // Final JSON structure
        const resultJson = {
            university,
            status_date,
            current_date,
            enrolment_no,
            programme_code,
            results
        };
        return resultJson;
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
};
exports.htmlDataExtractor = htmlDataExtractor;
//# sourceMappingURL=html-data-extractor.js.map