import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { BookingTableData } from '../../../../domains/interfaces/IBookingTableData';
import { Router } from '@angular/router';

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
export class BookingListComponent {

  constructor(private router: Router){

  }

  bookings: BookingTableData[] = [
    {
      idBooking: '121232',
      titularName: 'Roger Murcia Garcia',
      guestNumber: 5,
      startDate: '04/06/2025',
      endDate: '03/07/2025',
      HotelName: 'Empire State'
    },
    {
      idBooking: '121232',
      titularName: 'Pedro Leon Marino',
      guestNumber: 3,
      startDate: '12/03/2025',
      endDate: '16/03/2025',
      HotelName: 'Coco House'
    }
  ]

  showDetailsBooking(bookingSelect: any){
    this.router.navigateByUrl(`${this.router.url}/booking-details`)
  }

}
