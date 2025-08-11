import { Itinerary } from "./IItinerary";



export class FlightItinerary implements Itinerary{
    display(): string {
        return "Displaying flight itinerary..."
    }
}

