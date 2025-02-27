import { FormControlStatus } from "@angular/forms";
import { StatusRoom } from "../enums/EStatusRoom";

export interface IRoomBasic {
    id: string;
    price: number;
    taxes: number;
    type:string;
    pathImg: string;
    status: StatusRoom;
    location: string;
}

export interface IRegisterRoom extends Omit<IRoomBasic, 'id' > {
    hotelId: string;
    capacity: number;
}

export interface IUpdateRoom extends Omit<IRegisterRoom, 'pathImg' | 'hotelId' | 'capacity' > {}


export interface RoomData extends Omit<IRoomBasic, 'status' | 'location'>{
    hotelName: string;
    city: string;
    address: string;
    rating: number;
}

export interface IRoomDataForm {
    roomData: IRegisterRoom,
    statusForm: FormControlStatus
}