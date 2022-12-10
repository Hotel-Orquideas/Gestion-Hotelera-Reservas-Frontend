import { Client } from "../../client-components/list-clients/client";
import { Company } from "../../company-components/list-companies/company";

export class Bill{
    id:number;
    date:Date;
    total:number;
    balanceDue:number; //saldo por pagar. Ejemplo: el total es 100 mil, se hace un pago de 20 mil, este valor debería ser 80 mil
    clientId:number;
    companyId:number;
    client:Client;
    company:Company;
}