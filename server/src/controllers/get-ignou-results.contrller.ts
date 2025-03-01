import studentResultModel from "../models/student-result.model";
import studentModel from "../models/student.model";
import { TEEDataExtractor, teeMergeHtml, tee_result } from "../utils";
import _ from "lodash";
import { sendEmail } from "./send-email.controller";

export const getIgnouResult = async (student_id: string) => {
  try {
    const student = await studentModel.findById(student_id);
    if (!student) {
      return null;
    }
    const url = tee_result(student.enrollment_no, student.requested_result[0]);
    const data = await TEEDataExtractor(url);
    const results = await studentResultModel
      .findOne({ student_id, type: student.requested_result[0] })
      .lean();
    if (results?._id) {
      await studentResultModel.findByIdAndUpdate(
        results._id,
        {
          ...data,
        },
        { new: true }
      );
    } else
      await studentResultModel.create({
        ...data,
        type: student.requested_result[0],
        student_id,
      });
    const prev_result = results?.results?.map(({ _id, ...rest }) => rest) || [];
    if (
      _.isEqual(
        _.sortBy(prev_result, "course_code"),
        _.sortBy(data.results, "course_code")
      )
    )
      return null;
    const new_result = _.differenceWith(data.results, prev_result, _.isEqual);
    const mail_html = teeMergeHtml(prev_result, new_result);
    await sendEmail(student.email, mail_html);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
};
