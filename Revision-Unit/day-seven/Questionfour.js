
console.log("question 4")


// function solve(){ 
//     console.log(this)
// }
// solve();

// call

// let objone={name:"swapnil"}

// function welcome(s1,s2){
//     console.log(`${s1}, ${s2} ${this.name}`)
// }
// welcome.call(objone,"hiii", "im")

//apply
// let objone={name:"swapnil"}

// function welcome(arr){
//     console.log(`${arr[0]}, ${arr[1]} ${this.name}`)
// }
// welcome.call(objone,["hiii", "im"])


const userone={
    name:"swapnil",
    talk(){
        console.log(`hii im ${this.name}`)
    }
}

setTimeout(userone.talk.bind(userone),2000)

