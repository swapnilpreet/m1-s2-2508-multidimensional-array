"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Latte = exports.Espresso = void 0;
class Espresso {
    getCost() {
        return 150;
    }
    getDescription() {
        return "Espresso ";
    }
}
exports.Espresso = Espresso;
class Latte {
    getDescription() {
        return "Lattle ";
    }
    getCost() {
        return 100;
    }
}
exports.Latte = Latte;
