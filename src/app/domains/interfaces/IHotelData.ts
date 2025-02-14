import { FormControlStatus } from "@angular/forms";
import { StatusRoom } from "../enums/EStatusRoom";
import { RoomDetailData } from "./IRoomData";

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
    rooms: RoomDetailData[];
}

export interface HotelDataForm {
    hotelData: RegisterHotel,
    statusForm: FormControlStatus
}

export interface RegisterHotel extends Omit<HotelDetailData, 'id'|'innactivateRooms'|'activateRooms'| 'rooms'> {}