import { Person } from "./person";

export class Employee extends Person{
    id:number;
    position:string="";
    state:string;
    userName:string="";
    password:string="";
    person:Person = new Person();
    roleSender:string="Administrador";

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
