import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from '../../../../core/services/global/global.service';
import { RoomData } from '../../../../domains/interfaces/IRoomData';
import { RoomFilter } from '../../../../domains/interfaces/IRoomFilter';
import { environments } from '@envs/environments';
import { HotelData, HotelDetailData, RegisterHotel } from '../../../../domains/interfaces/IHotelData';
import { BookingSummaryData, BookingTableData } from '../../../../domains/interfaces/IBookingTableData';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private global: GlobalService
  ) {

  }

  findRooms(RoomFilters:RoomFilter): Observable<RoomData[]>{
    return this.global.post(environments.URL_ROOM_FILTERED, RoomFilters)
  }

  getHotels(): Observable<HotelData[]>{
    return this.global.post(environments.URL_HOTELS_BASIC);
  }

  getBookings(): Observable<BookingTableData[]>{
    return this.global.post(environments.URL_BOOKINGS_BASIC);
  }

  getHotelDetails(id: string): Observable<HotelDetailData>{
    return this.global.get(`${environments.URL_HOTEL_DETAILS}/${id}`);
  }

  getBookingDetails(id: string): Observable<BookingSummaryData>{
    return this.global.get(`${environments.URL_BOOKING}/${id}`);
  }

  registerHotel(hotelData: RegisterHotel): Observable<HotelData[]>{
    return this.global.post(`${environments.URL_API_USERS}/hotel/register`, hotelData);
  }
}
