"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreaditCardPayment_1 = require("./CreaditCardPayment");
const PaymentProcessor_1 = require("./PaymentProcessor");
const newprocess = new PaymentProcessor_1.PaymentProcessor();
newprocess.setStrategy(new CreaditCardPayment_1.CreaditCardPayment());
newprocess.processPayment({
    cardNumber: "145212121451212",
    expiryDate: "1/26",
    cvv: '555'
}, 1000);
