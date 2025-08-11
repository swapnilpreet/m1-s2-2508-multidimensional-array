import { IInvoice } from "./IInvoice";


export class FlightInvoice implements IInvoice{
    generate(): string {
        return "Generating Flight invoice.."
    }
}

