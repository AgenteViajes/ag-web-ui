import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { StatusRoom } from '../../../../domains/enums/EStatusRoom';
import { HotelData } from '../../../../domains/interfaces/IHotelData';
import { Router } from '@angular/router';
import { BookingService } from '../../../booking/services/booking/booking.service';

@Component({
  selector: 'hotels-list',
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    ButtonModule,
    TagModule,
    BadgeModule,
    OverlayBadgeModule
  ],
  templateUrl: './hotels-list.component.html',
  styleUrl: './hotels-list.component.scss'
})
export class HotelsListComponent implements OnInit, OnChanges {
  @Output() selectedHotel = new EventEmitter<HotelData>();
  @Input() updateList = false;
  hotels!: HotelData[];

  constructor(
    private bookingService: BookingService
  ){

  }

  ngOnInit(): void {
    this.getHotelsList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.updateList) {
      this.getHotelsList();
    }
  };

  getHotelsList(){
    this.bookingService.getHotels().subscribe({
      next: (response)=>{
        this.hotels = response;
      }
    });
  }

  selectHotel(hotel: HotelData) {
    this.selectedHotel.emit(hotel);
  }

  getSeverity(status: StatusRoom) {
    switch (status) {
      case StatusRoom.DISABLED:
        return 'secondary';

      case StatusRoom.ENABLED:
        return 'success';

      default:
        return 'secondary'
    }
  }
}
