const baseurl = "https://fir-ii-aa9da-default-rtdb.asia-southeast1.firebasedatabase.app/";

let currentPage = 1;
let itemsPerPage = 5;
let allBooks = [];
 
async function fetchbooks() {
  let res=await fetch(`${baseurl}/books.json`)
  let data=await res.json();

  console.log('data',data);
  if(!data) return [];

  // return Object.entries(data).map(([id,book])=>({id,...book}))
  return Object.entries(data).map(([id,book])=>({...book,id}))
}
// console.log(fetchbooks())

async function displaybooksfn() {
  let books= await fetchbooks();
  console.log("books",books)
  let displaybooks=document.getElementById('booksList');
  displaybooks.innerHTML="";

  if(books.length===0){
    displaybooks.innerHTML=`
    <p>Books not Found</p>
    `
    return
  }else{
    books.forEach((book)=>{
      let bookcard=document.createElement('div');
      bookcard.innerHTML=`
      <p>Title - <strong>${book.title}</strong> -${book.publishedYear}</p>
      <p>Id - ${book.id}</p>
      <p>Author - ${book.author}</p>
      <p>Genre - ${book.genre}</p>
      <p> Available - <strong>${book.available}</strong></p>
      <button onclick="editbooks('${book.id}','${book.title}','${book.publishedYear}','${book.author}','${book.genre}','${book.available}')">Edit</button>
      <button onclick="deletebooks('${book.id}')">Delete</button>
      `
      displaybooks.appendChild(bookcard)
    })
  }

 
displaybooksfn()

function editbooks(id,title,publishedYear,author,genre,available) {
  console.log("id eid",id)
  document.getElementById('bookId').value=id
  document.getElementById('title').value=title
  document.getElementById('author').value=author
  document.getElementById('genre').value=genre
  document.getElementById('year').value=publishedYear
  document.getElementById('available').value=available
}

async function addandupdate() {
  let bookId=document.getElementById('bookId').value;
  let book={
    title:document.getElementById('title').value,
    author:document.getElementById('author').value,
    genre:document.getElementById('genre').value,
    publishedYear:document.getElementById('year').value,
    available:document.getElementById('available').value
  }

  console.log("bookid",bookId)
  if(bookId){
    await fetch(`${baseurl}/books/${bookId}.json`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(book)
    })
    document.getElementById('bookId').value="";
  }else{
    await fetch(`${baseurl}/books/.json`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(book)
    })
  }
  document.getElementById('bookId').value="";
  document.getElementById('title').value="",
  document.getElementById('author').value="",
  document.getElementById('genre').value="",
  document.getElementById('year').value="",
  document.getElementById('available').value=""
  displaybooksfn();
}


async function deletebooks(id) {
  console.log("id delete",id)
  await fetch(`${baseurl}/books/${id}.json`,{
    method:"DELETE"
  })
  displaybooksfn()
}

}