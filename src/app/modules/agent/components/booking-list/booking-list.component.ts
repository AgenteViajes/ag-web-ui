import { Component, Input, OnInit } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { BookingTableData } from '../../../../domains/interfaces/IBookingTableData';
import { Router } from '@angular/router';
import { BookingService } from '../../../booking/services/booking/booking.service';

@Component({
  selector: 'agent-booking-list',
  imports: [
    TagModule,
    BadgeModule,
    ButtonModule,
    CardModule,
    OverlayBadgeModule,
    TableModule
  ],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.scss'
})
export class BookingListComponent implements OnInit {

  bookings!: BookingTableData[];

  constructor(
    private router: Router,
    private bookingService: BookingService
  ){

  }
  ngOnInit(): void {
    this.bookingService.getBookings().subscribe({
      next:(response)=>{
        this.bookings= response;
      }
    })
  }

  showDetailsBooking(bookingSelect: any){
    this.router.navigateByUrl(`${this.router.url}/booking-details/${bookingSelect.idBooking}`)
  }

}
