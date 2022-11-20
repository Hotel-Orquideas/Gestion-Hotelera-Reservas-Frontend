import { Company } from "../../company-components/list-companies/company";

export class Promotion{
    id:number;
    description:string;
    percentage:number;
    expirationDate:Date;
    companyId:number;
    company:Company = new Company;
}