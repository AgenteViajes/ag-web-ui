import { StatusRoom } from "../enums/EStatusRoom";

export interface IHotelData {
    name: string;
    city: string;
    address: string;
    innactivateRooms: number;
    activateRooms: number;
    status: StatusRoom;
}