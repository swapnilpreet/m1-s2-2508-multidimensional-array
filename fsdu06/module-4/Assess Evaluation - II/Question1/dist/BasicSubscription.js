"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicSubscription = void 0;
const CourseSubscription_1 = require("./CourseSubscription");
class BasicSubscription extends CourseSubscription_1.Coursesubscription {
    getCost() {
        return 499;
    }
    getFeatures() {
        return ['Access to all basic courses'];
    }
}
exports.BasicSubscription = BasicSubscription;
