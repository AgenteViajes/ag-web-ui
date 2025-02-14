import { StatusRoom } from "../enums/EStatusRoom";

export interface RoomData {
    id: string;
    price: number;
    taxes: number;
    type:string;
    pathImg: string;
    hotelName: string;
    city: string;
    address: string;
    rating: number;
}

export interface RoomDetailData extends Omit<RoomData, 'hotelName' |'city'| 'address'| 'rating'> {
    status: StatusRoom;
    location: string;
}