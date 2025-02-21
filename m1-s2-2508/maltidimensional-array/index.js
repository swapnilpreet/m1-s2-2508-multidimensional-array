
// Q: 11 Title: L0-Your first 2D Array Problem

let count=1;
let ans=""
for(let i=1;i<=3;i++){
    for(let j=1;j<=2;j++){
        ans+=count+" "
        count++
    }
    ans+="\n"
}
console.log(ans)







// Q: 12 Title: L0-Sum of Indexes

let ans1=""
for(let i=0;i<3;i++){
    for(let j=0;j<2;j++){
        let sum=i+j
        ans1+=sum+" "
    }
    ans1+="\n"
}
console.log(ans1);




// Q: 13 Title: L1-Go in Zig-Zag

let n=3,m=4;
let matrix=[[1,2,3,4,5],[6,7,8,9,1],[3,2,5,4,6],[7,8,9,1,2]]
let ans2=""
for(let i=0; i<=n; i++){
    if(i%2===0){
        for(let j=m; j>=0; j--){
            ans2+=matrix[i][j]+" "
        }
    }else{
        for(let j=0; j<=m; j++){
             ans2+=matrix[i][j]+" "
        }
    }
}
console.log(ans2);






// Q: 14 **Title:**L1-Pattern Printing III

let n1=5;
let ans3="";
for(let i=0; i<n1; i++){
    if(i==0 || i==n-1){
        for(let j=0;j<5;j++){
           ans3+="*"+" "   
        }
    }else{
        ans3+="*"+" "
    }
    ans3+="\n"
}

console.log(ans3);



// Q: 15 Title: L2-Circular Traversal

let matrix1 = [[1,2,3],[4,5,6],[7,8,9]]
function name1(matrix1) {
    let answer = ''

    for(let i = matrix1.length-1; i >=0;i--){
        answer += matrix1[i][0]+" ";
    }

    for(let i = 1;i<=matrix1.length-1;i++){
        answer += matrix1[0][i]+" ";
    }

    for(let i = 1;i<matrix1.length;i++){
        answer += matrix1[i][matrix1.length-1]+" ";
    }

    for(let i = matrix1[0].length-2;i>0;i--){
        answer += matrix1[matrix1.length-1][i]+" ";
    }

    console.log(answer)
}

name1(matrix1)