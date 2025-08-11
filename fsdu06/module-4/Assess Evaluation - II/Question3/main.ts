import { CreaditCardPayment } from "./CreaditCardPayment";
import { PaymentProcessor } from "./PaymentProcessor";



const newprocess = new PaymentProcessor();

newprocess.setStrategy(new CreaditCardPayment());
newprocess.processPayment({
    cardNumber:"145212121451212",
    expiryDate:"1/26",
    cvv:'555'
},1000)

