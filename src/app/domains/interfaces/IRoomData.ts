import { StatusRoom } from "../enums/EStatusRoom";

export interface RoomData {
    id: string;
    hotelName: string;
    city: string;
    address: string;
    price: number;
    taxes: number;
    rating: number;
    type:string;
    pathImg: string;
}

export interface RoomDetailData extends Omit<RoomData, 'hotelName' |'city'| 'address'| 'rating'> {
    status: StatusRoom;
    location: string;
}