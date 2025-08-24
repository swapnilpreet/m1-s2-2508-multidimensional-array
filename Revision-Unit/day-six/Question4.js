const students = [
  { name: "Alice", age: 20, grade: "A", score: 85 },
  { name: "Bob", age: 22, grade: "B", score: 70 },
  { name: "Charlie", age: 23, grade: "A", score: 92 },
  { name: "David", age: 21, grade: "C", score: 60 },
  { name: "Eva", age: 20, grade: "B", score: 88 },
  { name: "Frank", age: 22, grade: "A", score: 95 },
  { name: "Grace", age: 21, grade: "C", score: 72 },
  { name: "Hannah", age: 23, grade: "B", score: 80 },
];
const studentfiltter = students.filter((student) => student.score >= 75);
console.log(studentfiltter);
const maxScorer = studentfiltter.reduce((max, student) => {
  return student.score > max.score ? student : max;
});
console.log(maxScorer);
const groupedByGrade = studentfiltter.reduce((grp, student) => {
  if (!grp[student.grade]) {
    grp[student.grade] = [];
  }
  grp[student.grade].push(student);
  return grp;
}, {});
console.log(groupedByGrade);
