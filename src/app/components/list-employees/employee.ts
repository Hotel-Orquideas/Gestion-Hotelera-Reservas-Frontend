export class Employee {
    id:number=0;
    name:string="";
    lastName:string="";
    typeDocument:string="";
    document:string="";
    genre:string="";
    birthdate:Date=new Date();
    phoneNumber:string="";
    email:string="";
    bloodType:string="";
    position:string="";
    userName:string="";
    password:string="";
    
    
    person={
        "name":this.name,
        "lastName":this.lastName,
        "typeDocument":this.typeDocument,
        "document":this.document,
        "genre":this.genre,
        "birthdate":this.birthdate,
        "phoneNumber":this.phoneNumber,
        "email":this.email,
        "bloodType":this.bloodType
    };
    
    //roleId:number;
    //hotelId:number;


}
