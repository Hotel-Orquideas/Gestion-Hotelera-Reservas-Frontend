import { Person } from "../../employee-components/list-employees/person";

export class Client extends Person{
    id:number;
    countryOrigin:string;
    cityOrigin:string;
    countryDestination:string;
    cityDestination:string;
    dateIssuanceDoc:Date;
    profession:string;
    person:Person = new Person();
    client:Client;
}