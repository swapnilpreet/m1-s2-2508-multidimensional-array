interface RouteStrategy{
    calculateRoute(start:string, end:string): void;
}

class FastestRoute implements RouteStrategy {
    calculateRoute(start:string,end:string):void{
        console.log(`Calculating fastest route from ${start} to ${end}...`);
        console.log("Recommended route: NH48 - 280 km - 4 hours");
    }
}

class ScenicRoute implements RouteStrategy {
    calculateRoute(start: string, end: string): void {
        console.log(`Calculating scenic route from ${start} to ${end}...`);
        console.log("Recommended route: NH48 - 280 km - 5 hours with scenic views");
    }
}

class ShortestDistanceRoute implements RouteStrategy {
    calculateRoute(start: string, end: string): void {
        console.log(`Calculating shortest distance route from ${start} to ${end}...`);
        console.log("Recommended route: NH48 - 270 km - 4.5 hours with minimal stops");
    }
}


class RoutePlanner {
    private strategy: RouteStrategy;
    constructor(strategy:RouteStrategy){
        this.strategy=strategy;
    }
    setStrategy(strategy:RouteStrategy):void{
        this.strategy = strategy;
    }
    printRoute(start:string,end:string): void {
        this.strategy.calculateRoute(start, end);
    }
}


const fastestRoute = new FastestRoute();
const routePlanner = new RoutePlanner(fastestRoute);
routePlanner.printRoute("Delhi", "Jaipur");