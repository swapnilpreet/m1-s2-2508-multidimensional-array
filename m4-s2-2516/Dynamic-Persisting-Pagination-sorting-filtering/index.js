
let baseurl=`https://jsonplaceholder.typicode.com/todos`;
var todos=[];
let todosPerPage=10;
let CurrentPage=1;

async function fetchtodos(){
    try {
        const res = await fetch(baseurl);
        todos=await res.json()
        console.log("todos",todos)
        displaytodos();
        showpaginationbtn();
    } catch (error) {
        document.getElementById('displaytodos').innerHTML=`
        <p>Error occured during fetch</p>
        `
    }
}
// console.log("ee",todos)

function displaytodos() {
    let st=(CurrentPage-1)*todosPerPage;
    let end=st+todosPerPage;
    let disPerPagtodos=todos.slice(st,end)
    let displayhere=document.getElementById('displaytodos');
    
    displayhere.innerHTML="";

    disPerPagtodos.forEach((ele)=>{
        let div=document.createElement('div');
        let checkbox=document.createElement('input');
        checkbox.type='checkbox';
        checkbox.checked=ele.completed;
        div.textContent=`
        ${ele.title}
        `
        div.appendChild(checkbox)
        displayhere.appendChild(div)
    })
}
function showpaginationbtn() {
    // console.log("vv",todos)
    let totalpagebtn=Math.ceil(todos.length/todosPerPage);
    let divbtn=document.getElementById('pagiationbtn');
    divbtn.innerHTML='';

    for(let i=1;i<=totalpagebtn;i++){
        let btn=document.createElement('button');
        btn.innerText=i;
        btn.onclick=()=>{
            CurrentPage=i;
            displaytodos()
        }
        divbtn.appendChild(btn);
    }
}
fetchtodos()