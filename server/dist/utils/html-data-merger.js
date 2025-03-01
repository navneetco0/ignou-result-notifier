"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignmentStatusTable = exports.gradeCardTable = exports.teeResultToTable = exports.assignmentStatusMergeHtml = exports.gradeCardMergeHtml = exports.teeMergeHtml = void 0;
const teeMergeHtml = (prev_result, new_result) => `
<h2 style="text-align: center; font-size: 20px;">New Results</h2>
  <table
  cellspacing="0"
  cellpadding="5"
  align="Center"
  rules="all"
  border="2"
  id="ctl00_ContentPlaceHolder1_gvDetail"
  style="
    color: Black;
    border-width: 2px;
    border-style: solid;
    font-family: Arial;
    font-weight: normal;
    width: 100%;
    border-collapse: collapse;
  "
>
  <tr
    align="center"
    valign="top"
    style="
      color: White;
      background-color: #0f5092;
      font-size: Medium;
      font-weight: bold;
    "
  >
    <th scope="col">Course Code</th>
    <th scope="col">Marks/Grade</th>
    <th scope="col">Max Marks</th>
    <th scope="col">Month Year</th>
    <th scope="col">Date of Updation<br />on website</th>
    <th scope="col">Remarks</th>
  </tr>
  ${new_result.map((_, index) => (0, exports.teeResultToTable)(_, index)).join("")}
</table>
<h2 style="text-align: center; font-size: 20px;">Previous Results</h2>
<table
  cellspacing="0"
  cellpadding="5"
  align="Center"
  rules="all"
  border="2"
  id="ctl00_ContentPlaceHolder1_gvDetail"
  style="
    color: Black;
    border-width: 2px;
    border-style: solid;
    font-family: Arial;
    font-weight: normal;
    width: 100%;
    border-collapse: collapse;
  "
>
  <tr
    align="center"
    valign="top"
    style="
      color: White;
      background-color: #0f5092;
      font-size: Medium;
      font-weight: bold;
    "
  >
    <th scope="col">Course Code</th>
    <th scope="col">Marks/Grade</th>
    <th scope="col">Max Marks</th>
    <th scope="col">Month Year</th>
    <th scope="col">Date of Updation<br />on website</th>
    <th scope="col">Remarks</th>
  </tr>
  ${prev_result.map((_, index) => (0, exports.teeResultToTable)(_, index)).join("")}
  </table>
`;
exports.teeMergeHtml = teeMergeHtml;
const gradeCardMergeHtml = (prev_grade_card_data, new_grade_card_data) => `
<h2 style="text-align: center; font-size: 20px;">New Course codes upadated in grade card</h2>
<table cellspacing="0" cellpadding="8" align="Center" border="0" id="ctl00_ContentPlaceHolder1_gvDetail" style="color:#333333;border-width:2px;border-style:solid;font-family:Arial;width:100%;border-collapse:collapse;">
		<tr align="center" valign="top" style="color:White;background-color:#0F5092;font-size:Medium;font-weight:bold;">
			<th scope="col">COURSE</th><th scope="col">Asgn1</th><th scope="col">LAB1</th><th scope="col">LAB2</th><th scope="col">LAB3</th><th scope="col">LAB4</th><th scope="col">TERM END THEORY</th><th scope="col">TERM END PRACTICAL</th><th scope="col">STATUS</th>
		</tr>
    ${new_grade_card_data.map((_, index) => (0, exports.gradeCardTable)(_, index)).join("")}
	</table>
<h2 style="text-align: center; font-size: 20px;">Previous grade card</h2>
<table cellspacing="0" cellpadding="8" align="Center" border="0" id="ctl00_ContentPlaceHolder1_gvDetail" style="color:#333333;border-width:2px;border-style:solid;font-family:Arial;width:100%;border-collapse:collapse;">
		<tr align="center" valign="top" style="color:White;background-color:#0F5092;font-size:Medium;font-weight:bold;">
			<th scope="col">COURSE</th><th scope="col">Asgn1</th><th scope="col">LAB1</th><th scope="col">LAB2</th><th scope="col">LAB3</th><th scope="col">LAB4</th><th scope="col">TERM END THEORY</th><th scope="col">TERM END PRACTICAL</th><th scope="col">STATUS</th>
		</tr>
    ${prev_grade_card_data.map((_, index) => (0, exports.gradeCardTable)(_, index)).join("")}
	</table>
`;
exports.gradeCardMergeHtml = gradeCardMergeHtml;
const assignmentStatusMergeHtml = (prev_assignment, new_assignment) => `
<h2 style="text-align: center; font-size: 20px;">New Assignment Status</h2>
<table cellspacing="0" cellpadding="8" align="Center" border="0" id="ctl00_ContentPlaceHolder1_gvDetail" style="color:#333333;border-width:2px;border-style:solid;font-family:Arial;width:100%;border-collapse:collapse;>
    <tr align="center" valign="top" style="color:White;background-color:#0F5092;font-size:Medium;font-weight:bold;>
        <th scope="col">
            Name
        </th>
        <th scope="col">
            Course
        </th>
        <th scope="col">
            Session
        </th>
        <th scope="col">
            Status
        </th>
        <th scope="col">   
            <div align=center>Date</div>
        </th>
    </tr>
    ${new_assignment
    .map((_, index) => (0, exports.assignmentStatusTable)(_, index))
    .join("")}
</table>
<h2 style="text-align: center; font-size: 20px;">Previous Assignment Status</h2>
<table cellspacing=0 cellpadding=0 width=100% class=bkctable>
    <tr align="center" valign="top" style="color:White;background-color:#0F5092;font-size:Medium;font-weight:bold;>
        <th scope="col">
            Name
        </th>
        <th scope="col">
            Course
        </th>
        <th scope="col">
            Session
        </th>
        <th scope="col">
            Status
        </th>
        <th scope="col">
            <div align=center>Date</div>
        </th>
    </tr>
    ${prev_assignment
    .map((_, index) => (0, exports.assignmentStatusTable)(_, index))
    .join("")}
</table>

`;
exports.assignmentStatusMergeHtml = assignmentStatusMergeHtml;
const teeResultToTable = ({ course_code, marks, max_marks, month_year, date_of_updation, remarks }, index) => `<tr
    align="center"
    valign="middle"
    style="background-color: ${index % 2 ? "#EFF3FB" : "#EFF3AA"}; font-size: Medium; font-weight: normal"
  >
    <td align="center">
      <span
        id="ctl00_ContentPlaceHolder1_gvDetail_ctl02_lblCOURSE"
        style="font-weight: bold"
        >${course_code}</span
      >
    </td>
    <td align="center">
      <span
        id="ctl00_ContentPlaceHolder1_gvDetail_ctl02_lblMARKS"
        style="font-weight: bold"
      >
        ${marks}</span
      >
    </td>
    <td align="center">
      <span
        id="ctl00_ContentPlaceHolder1_gvDetail_ctl02_lblMAX"
        style="font-weight: bold"
        >${max_marks}</span
      >
    </td>
    <td align="center">
      <span
        id="ctl00_ContentPlaceHolder1_gvDetail_ctl02_lblEXAM"
        style="font-weight: bold"
        >${month_year}</span
      >
    </td>
    <td align="center">
      <span
        id="ctl00_ContentPlaceHolder1_gvDetail_ctl02_lblDATEONWEB"
        style="font-weight: bold"
        >${date_of_updation}</span
      >
    </td>
    <td align="center">
      <span
        id="ctl00_ContentPlaceHolder1_gvDetail_ctl02_lblRemarks"
        style="font-weight: bold"
>${remarks}</span>
    </td>
  </tr>`;
exports.teeResultToTable = teeResultToTable;
const gradeCardTable = ({ course_code, asgn_1, lab_1, lab_2, lab_3, lab_4, te_theory, te_practical, status, }, index) => `
<tr align="center" valign="middle" style="background-color:${index % 2 ? "#EFF3FB" : "#EFF3AA"};font-size:Medium;font-weight:normal;">
			<td>${course_code}</td><td>${asgn_1 || "-"}</td><td>${lab_1 || "-"}</td><td>${lab_2 || "-"}</td><td>${lab_3 || "-"}</td><td>${lab_4 || "-"}</td><td>${te_theory}</td><td>${te_practical}</td><td>${status}</td>
	</tr>
`;
exports.gradeCardTable = gradeCardTable;
const assignmentStatusTable = ({ name, course_code, session, status, date }, index) => `<tr align="center" valign="middle" style="background-color:${index % 2 ? "#EFF3FB" : "#EFF3AA"};font-size:Medium;font-weight:normal;">
    <td>${name}</td>
    <td>${course_code}</td>
    <td>${session}</td>
    <td>${status}</td>
    <td>${date}</td>
</tr>`;
exports.assignmentStatusTable = assignmentStatusTable;
//# sourceMappingURL=html-data-merger.js.map