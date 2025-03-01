// Q: 11
// Title:
// L0 - Transforming and Filtering with map() and forEach()


let products=[{ name: "Laptop", price: 1000 }, { name: "Mouse", price: 20 }]


function processProducts(product) {
    let newprod=product.map((ele)=>{
        return ele?.name
    })
    product.forEach(element => {
        if(element.price>50){
            console.log(`${element.name} is above $50`)
        }else{
            console.log(`${element.name} is below $50`)
        }
    });
}

processProducts(products);


// Q: 12
// Title:
// L0 - Filter and Sort Data with Higher-Order Functions


let stdData=[
  { "name": "Alice", "marks": 58 },
  { "name": "Bob", "marks": 85 },
  { "name": "Charlie", "marks": 92 },
  { "name": "David", "marks": 45 },
  { "name": "Emma", "marks": 76 },
  { "name": "Frank", "marks": 63 },
  { "name": "Grace", "marks": 89 },
  { "name": "Hannah", "marks": 95 },
  { "name": "Ian", "marks": 54 },
  { "name": "Jack", "marks": 79 },
  { "name": "Kate", "marks": 67 },
  { "name": "Leo", "marks": 88 },
  { "name": "Mia", "marks": 91 },
  { "name": "Nathan", "marks": 72 },
  { "name": "Olivia", "marks": 82 }
]

function processStudents(stdData) {
    let filterStd=stdData.filter((ele,i,arr)=>{
        return ele.marks > 60;
    })
    // console.log(filterStd)
    filterStd.sort((a,b)=>b.marks-a.marks)
    // console.log(filterStd)
    
    let ans=filterStd.map((ele)=>{
        return ele.name
    })

    return ans;
}

console.log(processStudents(stdData))


// Q: 13
// Title:
// L1 - Grouping and Summing with reduce()


let category=["electronics", "clothing", "electronics", "toys", "clothing", "toys", "toys"];

let ans2=category.reduce((acc,word)=>{
    acc[word]=(acc[word] || 0) +1
    return acc;
},{});

console.log(ans2) // { electronics: 2, clothing: 2, toys: 3 } no need to sort bcs we get currect output



// Q: 14
// Title:
// L1 - Employee Performance Evaluation System

let data=[{ name: "Alice", tasksCompleted: 8, rating: 4.7 },

{ name: "Bob", tasksCompleted: 4, rating: 4.0 },

{ name: "Charlie", tasksCompleted: 6, rating: 3.5 },

{ name: "David", tasksCompleted: 10, rating: 4.9 },

{ name: "Eve", tasksCompleted: 5, rating: 2.8 }]

function Employee(data) {
    let filteremp=data.filter((ele,i,arr)=>{
        return ele.tasksCompleted > 5;
    })
    
    let ans= filteremp.map((ele)=>({
        name:ele.name,
        performanceLevel : ele.rating > 4.5 ? "Excellent " : ele.rating>= 3 &&  ele.rating < 4.5 ? "Good" :"Needs Improvement"
    }));

    return ans;
}

console.log(Employee(data));