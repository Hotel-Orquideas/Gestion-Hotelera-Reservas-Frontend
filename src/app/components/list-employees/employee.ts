import { Person } from "./person";

export class Employee extends Person{
    id:number=0;
    position:string="";
    userName:string="";
    password:string="";
    person:Person = new Person();

    /*
    person={
        name:'',
        lastName:'',
        typeDocument:'',
        document:'',
        genre:'',
        birthdate: new Date(),
        phoneNumber:'',
        email:'',
        bloodType:''
    };
*/
}
