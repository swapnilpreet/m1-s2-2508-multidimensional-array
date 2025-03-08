// Q: 11
// L0 - Asynchronous Timer with Callback


function timer(duration, callback) {
   setTimeout(()=>{
       callback(`Timer of ${duration} ms finished`);
    },duration);
}

function onComplete(message) {
    console.log(message);
}
timer(2000,onComplete);



// Q: 12
// Title:
// L1- Simulating Asynchronous Data Fetching with Error Handling Using Async/Await


let fetchData = async() => {
    return new Promise((resolve,reject)=>{
        console.log("Fetching data");
        let isSuccess = Math.random() >= 0.5;
        setTimeout(()=>{
            if(isSuccess){
                resolve("success");
            }else{
                reject("error");
            }
        },2000)
    })
}
let loadData = async ()=>{
    try{
        let data = await fetchData();
        console.log(data);
    }catch{
        console.log("error");
    }
}
loadData();


// Q: 13
// Title : L1 - Testing if you know promises or not .

