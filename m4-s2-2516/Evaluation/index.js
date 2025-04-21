let baseurl =
  "https://evaluation-dc683-default-rtdb.asia-southeast1.firebasedatabase.app/";

let editstudentform = document.getElementById("editstudentform");

async function fetchstudents() {
  let res = await fetch(`${baseurl}.json`);
  let data = await res.json();

  console.log("data", data);
  if (!data) return [];

  return Object.entries(data).map(([id, student]) => ({ id, ...student}));
}
// console.log(fetchstudents());

function createRowtable(student) {
    console.log('svudent',student)
  const tr = document.createElement("tr");
  tr.innerHTML = `
      <td><img src="${student.imageurl}" alt="${student.name}"></td>
    <td>${student.id}</td>
    <td>${student.name}</td>
            <td>${student.age}</td>
              <td>${student.email}</td>
                <td>${student.course}</td>
                  <td>${student.gender}</td>
                    <td>${(student.skills || []).join(", ")}</td>
    `;

    return tr;
}
async function  displaystudentsfn(){
    let getAllstudents=await fetchstudents();

    localStorage.setItem("studentsData",JSON.stringify(getAllstudents));
    // console.log("getAllstudents",getAllstudents)
    const tbody=document.getElementById('displayData');
    tbody.innerHTML="";

    getAllstudents.forEach((student)=>{
        const tr=createRowtable(student);
        tbody.appendChild(tr);
    });
}

displaystudentsfn()

editstudentform?.addEventListener("submit", async (e) => {
  e.preventDefault();

  let id = document.getElementById("studentsid").value;
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let email = document.getElementById("email").value;
  let course = document.getElementById("course").value;
  let imageurl = document.getElementById("imageurl").value;
  let gender = document.querySelector("input[name='gender']:checked")?.value;
  let skilscheck = document.querySelectorAll("input[name='skills']:checked");
  let skills = Array.from(skilscheck).map((skill) => skill.value);

//   console.log(id, name, age, email, course, imageurl, gender, skills);

  const studentData = {
    name,
    age,
    email,
    course,
    imageurl,
    gender,
    skills,
  };

  if (id) {
    await fetch(`${baseurl}/${id}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });
    document.getElementById("studentsid").value = "";
  } else {
    await fetch(`${baseurl}.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });
  }
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("email").value = "";
  document.getElementById("course").value = "";
  document.getElementById("imageurl").value = "";
  let selectgender = document.querySelector("input[name='gender']:checked");
  if (selectgender) {
    selectgender.checked = false;
  }
  let selectskill = document.querySelectorAll("input[name='skills']:checked");
  selectskill.forEach((skill) => (skill.checked = false));
  displaystudentinprofilefn()
  displaystudentsfn()
});

function sortStudentbyname(students) {
    return students.sort((a,b)=>a.name.localeCompare(b.name))
}

function filterstudentsByName(student,value) {
    console.log("student,value",student,value)
    return student.filter((ele)=>{
        console.log("student.filter",ele)
        ele.name.toLowerCase().includes(value.toLowerCase())
    })
}

async function sortStudent() {
    let students=JSON.parse(localStorage.getItem("studentsData"));

    let sortedStudents=sortStudentbyname(students);

    const tbody=document.getElementById('displayData');
    tbody.innerHTML="";

    sortedStudents.forEach((student)=>{
        const tr=createRowtable(student);
        tbody.appendChild(tr);
    });

}

async function filterStudents() {
    let value=document.getElementById('SeachInput').value;

    let students=JSON.parse(localStorage.getItem("studentsData"));

    let filterstudents=filterstudentsByName(students,value);

    console.log("filterStudents",filterstudents)
    const tbody=document.getElementById('displayData');
    tbody.innerHTML="";


    filterstudents.forEach((student)=>{
        const tr=createRowtable(student);
        tbody.appendChild(tr);
    });

}



function createRowtableprofile(student) {
    console.log('svudent',student)
  const tr = document.createElement("tr");
  tr.innerHTML = `
      <td><img src="${student.imageurl}" alt="${student.name}"></td>
    <td>${student.id}</td>
    <td>${student.name}</td>
            <td>${student.age}</td>
              <td>${student.email}</td>
                <td>${student.course}</td>
                  <td>${student.gender}</td>
                    <td>${(student.skills || []).join(", ")}</td>
                    <td><button onclick="editstudent('${student.id}','${student.imageurl}')">Edit</button></td>
                    <td> <button onclick="deletestudent('${student.id}')">Delete</button></td>
    `;

    return tr;
}
async function  displaystudentinprofilefn(){
    let getAllstudents=await fetchstudents();

    localStorage.setItem("studentsData",JSON.stringify(getAllstudents));
    // console.log("getAllstudents",getAllstudents)
    const tbody=document.getElementById('displayDatainprofile');
    tbody.innerHTML="";
    getAllstudents.forEach((student)=>{
        const tr=createRowtableprofile(student);
        tbody.appendChild(tr);
    });
}

displaystudentinprofilefn()

async function deletestudent(id) {
    console.log("id delete",id)
    await fetch(`${baseurl}/${id}.json`,{
      method:"DELETE"
    })
    displaystudentinprofilefn()()
  }

  async function editstudent(editid,imageurl) {
    let id = document.getElementById("studentsid");
    id.value=editid
    let imageurlup = document.getElementById("imageurl");
    imageurlup.value=imageurl;
  }