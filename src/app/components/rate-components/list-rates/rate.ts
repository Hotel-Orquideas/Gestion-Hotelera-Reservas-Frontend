import { RoomType } from "../../roomType-components/list-room-types/roomType";

export class Rate{

    id:number;
    name:string;
    value:number;
    roomTypeId:number;
    roomType:RoomType = new RoomType();

}