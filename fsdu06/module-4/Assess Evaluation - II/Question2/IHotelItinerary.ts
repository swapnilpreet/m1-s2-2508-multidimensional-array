import { IInvoice } from "./IInvoice";





export class HotelInvoice implements IInvoice{
    generate(): string {
        return "Generating hotel invoice..."
    }
}

