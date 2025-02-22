// Q: 11
// Title: L0 - Traversing Objects with for...in

let book = { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 };

let ans=''
for(let key in book) {
    ans+=`${key}: ${book[key]} `;
}
console.log(ans)




// Q 12

function nobita(str) {
    let mapping={};
    for(let i=0;i<str.length;i++){
        if(mapping[str[i]]){
            mapping[str[i]]++
        }else{
            mapping[str[i]]=1;
        }
    }
    
    let max = Infinity
    for(let key in mapping){
        if(mapping[key]<max){
            max = mapping[key]
        }
    }
    return max
}

console.log(nobita("abbcacs"))


// Q: 15
// Title:
// L2 - Dynamic Object Methods for Sentence Generation


let sentenceBuilder={
    subject:
}