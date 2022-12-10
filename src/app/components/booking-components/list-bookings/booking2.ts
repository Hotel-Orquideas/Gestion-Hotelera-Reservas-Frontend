import { Client } from "../../client-components/list-clients/client";
import { Company } from "../../company-components/list-companies/company";

export class Booking2 {
    id: number;
    checkInDate: Date;
    checkOutDate: Date;
    details:String;
    state:String;
    company: Company = new Company();
    client: Client=new Client();
}