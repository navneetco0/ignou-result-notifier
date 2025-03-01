import axios from "axios";
import * as cheerio from "cheerio";

export const TEEDataExtractor = async (url: string) => {
  try {
    // Fetch the HTML content
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Extract university name
    const university = $("#ctl00_lbl_title").text();

    // Extract other details
    const status_date = $("#ctl00_ContentPlaceHolder1_lblTEEasondt").text();

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
          remarks: $(cols[5]) ? $(cols[5]).text().trim() : "",
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
      results,
    };

    return resultJson;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const gradeCardDataExtractor = async (url: string) => {
  try {
    // Fetch the HTML content
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Extract university name
    const university = $("#ctl00_lbl_title").text();
    const student_name = $("#ctl00_ContentPlaceHolder1_lblDispname").text();

    // Extract other details
    const status_date = $("#ctl00_ContentPlaceHolder1_lblgcasondt").text();

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
    let grade_card = [];
    $("#ctl00_ContentPlaceHolder1_gvDetail tr").each((index, element) => {
      const cols = $(element).find("td");
      if (cols.length >= 7 && $(cols[0]).text().trim()) {
        grade_card.push({
          course_code: $(cols[0]).text().trim(),
          asgn_1:
            $(cols[1]).text().trim() === "-" ? 0 : +$(cols[1]).text().trim(),
          lab_1:
            $(cols[2]).text().trim() === "-" ? 0 : +$(cols[2]).text().trim(),
          lab_2:
            $(cols[3]).text().trim() === "-" ? 0 : +$(cols[3]).text().trim(),
          lab_3:
            $(cols[4]).text().trim() === "-" ? 0 : +$(cols[4]).text().trim(),
          lab_4:
            $(cols[5]).text().trim() === "-" ? 0 : +$(cols[5]).text().trim(),
          te_theory:
            $(cols[6]).text().trim() === "-" ? 0 : +$(cols[6]).text().trim(),
          te_practical:
            $(cols[7]).text().trim() === "-" ? 0 : +$(cols[7]).text().trim(),
          status: $(cols[8]).text().trim(),
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
      student_name,
      grade_card,
    };

    return resultJson;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const assignmentStatusExtractor = async (
  EnrNo: string,
  program: string
) => {
  try {
    const payload = {
      EnrNo,
      program,
      Submit: "Submit",
    };

    const { data } = await axios.post(
      "https://isms.ignou.ac.in/changeadmdata/StatusAssignment.ASP",
      new URLSearchParams(payload).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const $ = cheerio.load(data);
    let assignment_status = [];

        // Select the table containing the assignments
        $("table.bkctable tr").each((index, row) => {
            let rowData = $(row).find("td").map((_, cell) => {
                return $(cell).text().trim();  // Extract and trim text from each cell
            }).get();

            // Push data into array if it's a valid row (avoid headers)
            if (rowData.length === 5) {
                assignment_status.push({
                    name: rowData[0],
                    course_code: rowData[1],
                    session: rowData[2],
                    status: rowData[3],
                    date: rowData[4]
                });
            }
        });

    const resultJson = {
      assignment_status: assignment_status.slice(1),
    };

    return resultJson;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
