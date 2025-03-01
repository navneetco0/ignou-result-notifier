import _ from "lodash";
import studentModel from "../models/student.model";
import { sendEmail } from "./send-email.controller";
import {
  assignmentStatusExtractor,
  assignmentStatusMergeHtml,
} from "../utils";
import assignmentStatusModel from "../models/assignment-status.model";

export const compareIgnouAssignmentStatus = async (student_id) => {
  try {
    const student = await studentModel.findById(student_id);
    if (!student) {
      return null;
    }
    const data = await assignmentStatusExtractor(
      student.enrollment_no,
      student.programme_code
    );
    const assignment = await assignmentStatusModel
      .findOne({ student_id })
      .lean();
    if (!assignment?._id) {
      await assignmentStatusModel.create({
        student_id,
        ...data,
      });
    } else {
      await assignmentStatusModel.findByIdAndUpdate(
        assignment._id,
        {
          ...data,
        },
        { new: true }
      );
    }
    const prev_assignment_statuses =
      assignment?.assignment_status?.map(({ _id, ...rest }) => rest) || [];
    if (
      _.isEqual(
        _.sortBy(prev_assignment_statuses, "course_code"),
        _.sortBy(data.assignment_status, "course_code")
      )
    )
      return null;
    const new_grade_card = _.differenceWith(
      data.assignment_status,
      prev_assignment_statuses,
      _.isEqual
    );
    const mail_html = assignmentStatusMergeHtml(
      prev_assignment_statuses,
      new_grade_card
    );
    await sendEmail(student.email, mail_html);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
};
