export const tee_result = (enrollment:string, type: string) => {
    return `https://termendresult.ignou.ac.in/view_gradecard.aspx?eno=${enrollment}&type=${type}`;
}