import { IEmergencyContactData, IGuestData } from "./IGuestData";
import { RoomData } from "./IRoomData";

export interface BookingTableData {
    idBooking: string;
    titularName: string;
    guestNumber: number;
    startDate: string;
    endDate: string;
    HotelName: string;
}

export interface BookingData extends Omit<BookingTableData, 'HotelName' | 'titularName' > {
    quantityDays: number;
    room: RoomData;
}

export interface BookingSummaryData extends Omit<BookingData, 'guestNumber' > {
    titularId: number;
    guest: IGuestData[];
    emergencyContact: IEmergencyContactData;
}