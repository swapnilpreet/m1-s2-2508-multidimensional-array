const gallery = document.getElementById("gallery");
let start = 0;
const limit = 10;

async function fetchimages(start, limit) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`);
  const data = await res.json();
  return data;
}
function displayimages(data) {
  // gallery.innerHTML="";
  data.forEach((ele) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = ele.url;
    img.alt = ele.title;
    div.appendChild(img);
    gallery.appendChild(div);
  });
}
async function loadMoreImages() {
  const images = await fetchimages(start, limit);
  displayimages(images);
  start += limit;
}
loadMoreImages();
let isLoading = false;
window.addEventListener("scroll", async () => {
  const nearBottom =
    window.innerHeight + window.scrollY > document.body.offsetHeight - 500;

  if (nearBottom && !isLoading) {
    isLoading = true;
    await loadMoreImages();
    isLoading = false;
  }
});
