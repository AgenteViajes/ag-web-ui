import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GlobalService } from '../../../../core/services/global/global.service';
import { RoomData } from '../../../../domains/interfaces/IRoomData';
import { RoomFilter } from '../../../../domains/interfaces/IRoomFilter';
import { environments } from '@envs/environments';

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
}
