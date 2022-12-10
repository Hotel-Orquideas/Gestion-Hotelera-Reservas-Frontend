import { Client } from "../../client-components/list-clients/client";
import { Company } from "../../company-components/list-companies/company";

export class Booking {
    id: number;
    checkInDate: Date;
    checkOutDate: Date;
    company: Company = new Company();
    client: any;
    total: number;
    description: string = "Precio de tarifas";
    value: number;
    state: String;
    details: String = "Detalles: nada";
    hotelId: number = 1;
    companyId: any = '';
    clientId: any = '';
}