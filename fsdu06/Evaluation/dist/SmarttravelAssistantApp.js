"use strict";
class FastestRoute {
    calculateRoute(start, end) {
        console.log(`Calculating fastest route from ${start} to ${end}...`);
        console.log("Recommended route: NH48 - 280 km - 4 hours");
    }
}
class ScenicRoute {
    calculateRoute(start, end) {
        console.log(`Calculating scenic route from ${start} to ${end}...`);
        console.log("Recommended route: NH48 - 280 km - 5 hours with scenic views");
    }
}
class ShortestDistanceRoute {
    calculateRoute(start, end) {
        console.log(`Calculating shortest distance route from ${start} to ${end}...`);
        console.log("Recommended route: NH48 - 270 km - 4.5 hours with minimal stops");
    }
}
class RoutePlanner {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    printRoute(start, end) {
        this.strategy.calculateRoute(start, end);
    }
}
const fastestRoute = new FastestRoute();
const routePlanner = new RoutePlanner(fastestRoute);
routePlanner.printRoute("Delhi", "Jaipur");
