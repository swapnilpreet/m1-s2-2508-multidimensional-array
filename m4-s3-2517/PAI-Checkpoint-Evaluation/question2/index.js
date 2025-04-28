let displaygallery=document.getElementById('display-gallery');
let spinner=document.getElementById('spinner');
let filter=document.getElementById('filter');
let sort=document.getElementById('sort');
let pagination=document.getElementById('pagination');

let products=[];

async function fetchallproducts() {
    spinner.style.display="block"
    try {
        const response=await fetch('https://dummyjson.com/products/category/home-decoration');
        const data=await response.json();
        // console.log(data)
        products=data.products;
        displayData()
    } catch (error) {
        spinner.style.display='none'
    }
}

function displayData() {
    spinner.style.display='none'
    let copyproducts=[...products];
}

fetchallproducts()