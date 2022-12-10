import { RoomType } from "../../roomType-components/list-room-types/roomType";

export class Room{
    id: number;
    number: string;
    state: string;
    roomTypeId: number;
    roomType:RoomType;
    hotelId: number;
    room:Room;
}