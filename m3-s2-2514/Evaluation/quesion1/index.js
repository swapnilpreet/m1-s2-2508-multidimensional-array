
function solve(emp,que) {
    let ans=emp.filter((ele)=>
        ele.department.toLowerCase().includes(que)
    )
    console.log(ans)
}

const employees = [
    { id: 101, name: "Alice Johnson", department: "Engineering" },
    { id: 102, name: "Bob Martin", department: "Marketing" },
    { id: 103, name: "Clara Evans", department: "Engineering" },
    { id: 104, name: "Daniel Ray", department: "HR" },
    { id: 105, name: "Eve Carter", department: "Marketing" }
  ];
  
  const query = "engineer";

  solve(employees,query)