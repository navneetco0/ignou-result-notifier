import studentGradeCardModel from "../models/student-grade-card.model";
import studentModel from "../models/student.model";
import { grade_card_url, gradeCardDataExtractor, gradeCardMergeHtml } from "../utils";
import _ from "lodash";
import { sendEmail } from "./send-email.controller";

export const comapareIgnouGrade = async (student_id: string) => {
  try {
    const student = await studentModel.findById(student_id);
    if (!student) {
      return null;
    }
    const url = grade_card_url(student.enrollment_no, student.programme_code);
    const data = await gradeCardDataExtractor(url);
    const grade_card = await studentGradeCardModel
      .findOne({ student_id, programme_code: student.programme_code })
      .lean();
    if(!grade_card?._id){
        await studentGradeCardModel.create({
          student_id,
          ...data,
        }); 
    } else {
        await studentGradeCardModel.findByIdAndUpdate(
            grade_card._id,
            {
              ...data,
            },
            { new: true }
          );
    }
    const prev_grade_card = grade_card?.grade_card?.map(
      ({ _id, ...rest }) => rest
    ) || [];
    if (
      _.isEqual(
        _.sortBy(prev_grade_card, "course_code"),
        _.sortBy(data.grade_card, "course_code")
      )
    )
      return null;
    const new_grade_card = _.differenceWith(
      data.grade_card,
      prev_grade_card,
      _.isEqual
    );
    const mail_html = gradeCardMergeHtml(prev_grade_card, new_grade_card);
    await sendEmail(student.email, mail_html);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
};
