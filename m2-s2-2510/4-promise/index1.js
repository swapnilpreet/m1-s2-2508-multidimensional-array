

const newPromise = new Promise((resolve, reject)=>{
    let isAuth=true;

    setTimeout(()=>{
        if(isAuth){
            resolve("successful login");
        }else{
            reject("failed to login");
        }
    },1000)
})

newPromise.then((res)=>{
    console.log("res",res)
})
.catch((err)=>{
    console.log("err",err)
})