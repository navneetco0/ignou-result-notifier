export const tee_result = (enrollment: string, type: string) => {
  return `https://termendresult.ignou.ac.in/view_gradecard.aspx?eno=${enrollment}&type=${type}`;
};

export const grade_card_url = (enrollment: string, prog: string) => {
  return `https://gradecard.ignou.ac.in/gradecard/view_gradecard.aspx?eno=${enrollment}&prog=${prog}&type=1`;
};

export const assignment_status_url = (enrollment: string, prog: string) => {
  return `https://assignmentstatus.ignou.ac.in/view_assignmentstatus.aspx?eno=${enrollment}&prog=${prog}`;
};