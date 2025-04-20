
const baseurl = "https://jsonplaceholder.typicode.com/users";
const displayuser = document.getElementById("displayuser");
const sortSelect = document.getElementById("sort");

async function fetchuser(sortBy) {
  try {
    const res = await fetch(baseurl);
    if (!res) throw new Error("Failed to fetch data");
    let Users = await res.json();

    if (sortBy) {
      Users.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    }
    displayUsers(Users);
  } catch (error) {
    displayuser.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  }
}
function displayUsers(users) {
    displayuser.innerHTML = "";
    users.forEach((ele) => {
      const userDiv = document.createElement("div");
      const name = document.createElement("h3");
      const email = document.createElement("p");
      const company = document.createElement("p");
      userDiv.className = "product";
      name.textContent = ele.name;
      email.textContent = `Email: ${ele.email}`;
      company.textContent = `Company: ${ele.company.name}`;
  
      userDiv.appendChild(name);
      userDiv.appendChild(email);
      userDiv.appendChild(company);
      displayuser.appendChild(userDiv);
    });
  }
sortSelect.addEventListener("change", () => {
  const sortBy = sortSelect.value;
  const url = new URL(window.location);
  if (sortBy) {
    url.searchParams.set("sort", sortBy);
  } else {
    url.searchParams.delete("sort");
  }
  window.history.pushState({}, "", url);
  fetchuser(sortBy);
});
const initialSort = new URLSearchParams(window.location.search).get("sort");
if (initialSort) {
  sortSelect.value = initialSort;
}
fetchuser(initialSort);
