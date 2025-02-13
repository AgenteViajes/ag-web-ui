import { StatusRoom } from "../enums/EStatusRoom";

export interface HotelData {
    id: string;
    name: string;
    city: string;
    address: string;
    innactivateRooms: number;
    activateRooms: number;
    status: StatusRoom;
}

export interface HotelDetailData extends HotelData {
    rating: number;
    rooms: [];
}