"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.result_to_table = exports.merge_html = void 0;
const merge_html = (prev_result, new_result) => `
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
  ${new_result.map(_ => (0, exports.result_to_table)(_)).join("")}
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
  ${prev_result.map(_ => (0, exports.result_to_table)(_)).join("")}
  </table>
`;
exports.merge_html = merge_html;
const result_to_table = ({ course_code, marks, max_marks, month_year, date_of_updation, remarks, }) => `<tr
    align="center"
    valign="middle"
    style="background-color: #eff3fb; font-size: Medium; font-weight: normal"
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
exports.result_to_table = result_to_table;
//# sourceMappingURL=html-data-merger.js.map