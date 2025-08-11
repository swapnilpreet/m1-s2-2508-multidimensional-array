"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoPayment = void 0;
class CryptoPayment {
    validateDetails(details) {
        let { walletAddress } = details;
        let isvalid = !walletAddress && walletAddress.length > 10;
        if (isvalid) {
            this.details = details;
        }
        else {
            console.log("crypto payment validation failed");
        }
        return isvalid;
    }
    pay(amount) {
        let networdfee = 50;
        let total = amount + networdfee;
        console.log("paid amount is ", total, "using Crypto");
    }
}
exports.CryptoPayment = CryptoPayment;
