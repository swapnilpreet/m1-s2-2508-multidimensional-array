
// // debouncing 
// function debounce(fn,delay){
//     let timer;
//     return function(...args){
//         clearTimeout(timer)
//         timer=setTimeout(()=>{
//             fn.apply(this,args)
//         },delay)
//     }
// }

// let handleresize=debounce(()=>{
//     console.log("debounce"+new Date())
// },2000)

// window.addEventListener('resize',handleresize)

// // throttling 

// function throttling(fn,interval){
//     let lastinterval=0;
//     return function(...args){
//         let nowtime=Date.now();
//         if(nowtime-lastinterval>=interval){
//             fn.apply(this,args);
//             lastinterval=nowtime
//         }
//     }
// }
// let handelmouse=throttling(()=>{
//     console.log('trottling',new Date())
// },2000)

// document.addEventListener("mousemove",handelmouse)

if(!Array.prototype.filter){
    Array.prototype.filter=function(cb,thiarg){
        let result=[];
        for(let i=0;i<this.length;i++){
            if(i in this){
                let ele=this[i];
                if(cb.call(thiarg,ele,i,this)){
                    result.push(ele);
                }
            }
        }
        return result;
    }
}

let ans=[1,2,4,5,6];

let ans2=ans.filter((num)=>num>2)
console.log(ans2)