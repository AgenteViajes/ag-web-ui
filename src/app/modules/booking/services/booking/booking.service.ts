import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from '../../../../core/services/global/global.service';
import { IRegisterRoom, IRoomBasic, IUpdateRoom, RoomData } from '../../../../domains/interfaces/IRoomData';
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
    return this.global.post(`${environments.URL_HOTELS_MNGR}/room/filter`, RoomFilters)
  }

  findAllRooms(): Observable<RoomData[]>{
    return this.global.get(`${environments.URL_HOTELS_MNGR}/room`)
  }

  getHotels(): Observable<HotelData[]>{
    return this.global.get(`${environments.URL_HOTELS_MNGR}/hotel/basic`);
  }

  getBookings(): Observable<BookingTableData[]>{
    return this.global.get(`${environments.URL_HOTELS_MNGR}/booking/basic`);
  }

  getHotelDetails(id: string): Observable<HotelDetailData>{
    return this.global.get(`${environments.URL_HOTELS_MNGR}/hotel/${id}`);
  }

  getBookingDetails(id: string): Observable<BookingSummaryData>{
    return this.global.get(`${environments.URL_HOTELS_MNGR}/booking/${id}`);
  }

  registerHotel(hotelData: RegisterHotel): Observable<HotelData>{
    return this.global.post(`${environments.URL_HOTELS_MNGR}/hotel/register`, hotelData);
  }

  updateHotel(hotelData: RegisterHotel, id: string): Observable<HotelData>{
    return this.global.put(`${environments.URL_HOTELS_MNGR}/hotel/${id}`, hotelData);
  }

  registerRoom(roomData: IRegisterRoom): Observable<IRoomBasic>{
    return this.global.post(`${environments.URL_HOTELS_MNGR}/room/register`, roomData);
  }

  updateRoom(roomData: IUpdateRoom, id: string): Observable<IRoomBasic>{
    return this.global.put(`${environments.URL_HOTELS_MNGR}/room/${id}`, roomData);
  }

  registerBooking(bookingData: BookingSummaryData): Observable<BookingSummaryData>{
    return this.global.post(`${environments.URL_HOTELS_MNGR}/booking/register`, bookingData);
  }
}
