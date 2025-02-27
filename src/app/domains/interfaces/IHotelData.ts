import { FormControlStatus } from "@angular/forms";
import { StatusRoom } from "../enums/EStatusRoom";
import { IRoomBasic } from "./IRoomData";

export interface HotelData {
    id: string;
    name: string;
    city: string;
    address: string;
    innactivateRooms: number;
    activateRooms: number;
    status: StatusRoom;
    rating: number;
}

export interface RegisterHotel extends Omit<HotelData, 'id'| 'innactivateRooms' | 'activateRooms'> {}

export interface HotelDetailData extends HotelData {
    rooms: IRoomBasic[];
}

export interface HotelDataForm {
    hotelData: RegisterHotel,
    statusForm: FormControlStatus
}
