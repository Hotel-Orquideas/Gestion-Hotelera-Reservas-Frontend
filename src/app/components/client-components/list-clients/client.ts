import { Person } from "../../employee-components/list-employees/person";

export class Client extends Person{
    id:number;
    country_origin:string;
    city_origin:string;
    country_destination:string;
    city_destination:string;
    document_expedition_date:Date;
    profession:string;
    person:Person = new Person();
}