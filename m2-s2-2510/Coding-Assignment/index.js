// Q: 1
// Problem Statement
// Question 1: Banking Transaction System

function createBankAccount(initialBankAccount) {
    let BankBalance=initialBankAccount;
    return {
        deposit:function (amount) {
            let copybalance = BankBalance;
            copybalance=copybalance+amount;
            BankBalance=copybalance;
            return `New Balance: $${BankBalance}`
        },
        withdraw:function(amount) {
            if(amount>BankBalance){
                return "Insufficient funds";
            }else{
                let copybalance = BankBalance;
                copybalance=copybalance-amount;
                BankBalance=copybalance;
                return `New Balance: $${BankBalance}`
            }
        },
        getBalance:function() {
            return `Current balance: $${BankBalance}`
        }
    }
    
}

const myAccount = createBankAccount(1000);  
console.log(myAccount.deposit(500));   // "Deposited ₹500. New balance: ₹1500"  
console.log(myAccount.withdraw(200));  // "Withdrew ₹200. New balance: ₹1300"  
console.log(myAccount.withdraw(1500)); // "Insufficient funds"  
console.log(myAccount.getBalance());  
// "Current balance: ₹1300"  


// Q: 2
// Problem Statement
// Question 2: OTP Generator with Expiry

function createOTPSystem() {
    let OTP="";
    let count=0;

    return {
        generateOTP:function(){
           count=0;
           OTP=Math.floor(100000+Math.random()*900000);
           return `Your OTP is: ${OTP}`;
        },
        getOTP:function(){
            count++;
            if(count==1){
                return OTP;
            }else{
                return OTP="OTP expired"
            }
        }

    }
}

const otpSystem = createOTPSystem();  
console.log(otpSystem.generateOTP()); // "Your OTP is: 482193"  
console.log(otpSystem.getOTP());      // "482193"  
console.log(otpSystem.getOTP());      // "OTP expired"  
console.log(otpSystem.generateOTP()); // "Your OTP is: 739182"  
console.log(otpSystem.getOTP());      // "739182"  
console.log(otpSystem.getOTP());      // "OTP expired" 




// Q: 3
// Problem Statement
// Question: Chained Promises for Order Processing



function  placeholder() {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            const orderId = Math.floor(10+Math.random()*90);
            console.log(`Order ID: ${orderId}`);
            resolve(orderId);
        },1000)
    })
}

function  processOrder(orderId) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            const ProcessingCode = Math.floor(10+Math.random()*90);
            console.log(`Processing Code: ${ProcessingCode}`);
            resolve(ProcessingCode);
        },1000)
    })
}

function  confirmOrder(processingCode) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            const confirmationNumber = Math.floor(10+Math.random()*90);
            console.log(`Confirmation Number: ${confirmationNumber}`);
            resolve(confirmationNumber);
        },1000)
    })
}

function  calculateFinalResult(confirmationNumber) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            const additionalNumber = Math.floor(10+Math.random()*90);
            console.log(`Extra Number: ${additionalNumber}`);
            const FinalResult = confirmationNumber+additionalNumber;
            resolve(FinalResult);
        },1000)
    })
}


placeholder()
.then((orderId)=>processOrder(orderId))
.then((processingCode) => confirmOrder(processingCode))
.then((confirmationNumber) => calculateFinalResult(confirmationNumber))
.then((finalResult) => console.log(`Final Result: ${finalResult}`))
