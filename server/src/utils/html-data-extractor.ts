import axios from "axios"
import * as cheerio from "cheerio";

export const htmlDataExtractor = async (url:string) => {
    try {
        // Fetch the HTML content
       const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Extract university name
    const university = $("#ctl00_lbl_title").text();

    // Extract other details
    const status_date = $("#ctl00_ContentPlaceHolder1_lblTEEasondt")
      .text()

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

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}