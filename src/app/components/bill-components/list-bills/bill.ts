export class Bill{
    id:number;
    date:Date;
    total:number;
    balanceDue:number; //saldo por pagar. Ejemplo: el total es 100 mil, se hace un pago de 20 mil, este valor debería ser 80 mil
    clientId:number;
    companyId:number;
}