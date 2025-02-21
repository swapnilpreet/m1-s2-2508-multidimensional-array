// Q: 11
// Title: L0 - Determine Senior Citizen Discount Eligibility
 
function citizen(n) {
    if(n<1){
        console.log("Invalid Age")
        return;
    }
    if(n>=60){
        console.log("Eligible for Senior Discount")
    }else{
        console.log("Not Eligible for Senior Discount")
    }
}
let n=0;
citizen(n)



// Q: 12
// Title: L0 - Find Largest of Three Numbers Using Ternary Operator

function largest(num1, num2, num3) {
    
    let firstlargest = num1 > num2 ?
    (num1 > num3 ? num1 : num2) : 
    (num2 > num3 ? num2 : num3);

    console.log(firstlargest)

}
let num1 = 45, num2 = 78, num3 = 33;
largest(num1, num2, num3)




// Q: 13 Title: L1 - Student Grades Based on Score

let studentScores = {
    John: 85,
    Emma: 92,
    Sam: 67,
    Bob: 45
  };

  for(let key in studentScores){
    if(studentScores[key]>=90){
        console.log(`${key} - A`)
    }
    if(studentScores[key]>=80 && studentScores[key] < 90){
        console.log(`${key} - B`)
    }
    if(studentScores[key]>=70 && studentScores[key] < 80){
        console.log(`${key} - C`)
    }
    if(studentScores[key]>=60 && studentScores[key] < 70){
        console.log(`${key} - D`)
    }
    if(studentScores[key] < 60){
        console.log(`${key} - F`)
    }
  }







//   Q: 14 Title: L1 - Dynamic User Role Message with Object Properties

let user = { name: "Alice", role: "admin", active: false };


function Dynamic(user) {
    
    if(user.role == "admin" && user.active == true) {
         console.log("Admin Access Granted!")
         return
    }
    if(user.role == "admin" && user.active == false){
        console.log("Admin Access Revoked");
        return
    }
    if(user.role == "user" && user.active == true){
        console.log("User Access Granted!")
        return
    }
    if(user.role == "user" && user.active == false){
        console.log("User Access Revoked");
        return
    }
    else{
        console.log("Access Denied");
    }
}
Dynamic(user)




//   Q: 15






let user1 = { role: "admin", experience: 3, active: false, department: "Finance" };
console.log(Advanced(user1));
function Advanced(user1) {
    if(user1.role == "admin"){
        if(user1.active){
            if(user1.experience > 5 && user1.department == "IT"){
                return "Full IT Admin Access"
            }
            if(user1.experience > 5 && user1.department != "IT"){
                return "Full General Admin Access"
            }
            if(user1.experience <= 5){
                return "Limited Admin Access"
            }
        }else{
             return "Admin Access Revoked";
        }
    }
    if(user1.role == "manager"){
        if(user1.active){
            if(user1.experience > 3 && user1.department == "Sales"){
                return "Full Sales Manager Access"
            }
            if(user1.experience > 3 && user1.department != "Sales"){
                return "Full Manager Access"
            }
            if(user1.experience <= 3){
                return "Limited Manager Access"
            }
        }else{
             return "Manager Access Revoked";
        }
    }
    if(user1.role == "user"){
        if(user1.active){
            if(user1.department == "Support"){
                return "Priority Support Access"
            }
            if(user1.department != "Support"){
                return "User Access"
            }
        }else{
             return "User Access Revoked";
        }
    }else{
         return "Invalid Role";
    }
}