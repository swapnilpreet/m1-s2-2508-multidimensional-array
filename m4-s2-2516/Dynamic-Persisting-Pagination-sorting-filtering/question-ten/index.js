let baseurl = `https://jsonplaceholder.typicode.com/users`;

let PerPageUser = 6;
let CurrentPage = 1;

async function fetchUser() {
  try {
    const res = await fetch(
      `${baseurl}?_page=${CurrentPage}&_limit=${PerPageUser}`
    );
    if (!res) {
      throw new Error(`error occured in fetch!`);
    }
    const data = await res.json();
    console.log("User", data);
    displayusers(data);
  } catch (error) {
    document.getElementById("paginationbtn").innerHTML = `
        <p>Error Ocuured during user</p>
        `;
  }
}

function displayusers(data) {
  let displayUser = document.getElementById("displayuser");
  displayUser.innerHTML = "";

  data?.forEach((ele) => {
    let div = document.createElement("div");
        div.innerHTML = `
        <h2>${ele.name}</h2>
        <p>${ele.email}</p>
        <p>${ele.phone}</p>
        <p>${ele.username}</p>
        <p>${ele.website}</p>
        `;
        displayUser.appendChild(div);
     });

}


function showpaginationbtn() {
    let totalbtns=Math.ceil(10/PerPageUser);
    let showPagebtn=document.getElementById('paginationbtn')

    for(let i=1;i<=totalbtns;i++){
        let btn=document.createElement('button');
        btn.textContent=i;
        btn.onclick=()=>{
            CurrentPage=i;
            fetchUser(CurrentPage);
        };
        showPagebtn.appendChild(btn)
    }
}
fetchUser(CurrentPage);
showpaginationbtn()
