import { PaymentMethod } from "../../payment-method-components/list-payment-methods/paymentMethod";

export class PaymentHistory{
    id:number;
    valueToPay:number;
    dateOfPay:Date;
    billId:number;
    paymentMethodId:number;
    paymentMethod:PaymentMethod;
}