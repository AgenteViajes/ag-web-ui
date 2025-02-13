import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { StatusRoom } from '../../../../domains/enums/EStatusRoom';
import { HotelData } from '../../../../domains/interfaces/IHotelData';
import { Router } from '@angular/router';

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
export class HotelsListComponent {
  hotels: HotelData[] = [
    {
      id: 'BG1234',
      name: 'Empire State',
      city: 'Bogota',
      address: 'Kr 12 #12-44',
      innactivateRooms: 3,
      activateRooms: 23,
      status: StatusRoom.DISABLED,
    },
    {
      id: 'BG144434',
      name: 'Casa Vieja',
      city: 'Valle del cauca',
      address: 'av 12 km-12',
      innactivateRooms: 3,
      activateRooms: 23,
      status: StatusRoom.ENABLED,
    },
  ];

  constructor(private router: Router){

  }
  selectHotel(hotel: HotelData) {
    console.log('Hotel seleccioado', hotel);
    this.router.navigateByUrl(`${this.router.url}/hotel-details`)
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
