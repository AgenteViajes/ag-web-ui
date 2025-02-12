import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { BookingData } from '../../../../domains/interfaces/bookingData';
import { Tag } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';



@Component({
  selector: 'booking-summary-room',
  imports: [
    CardModule,
    Tag,
    DividerModule
  ],
  templateUrl: './summary-room.component.html',
  styleUrl: './summary-room.component.scss'
})
export class SummaryRoomComponent {

  selectedHotel: BookingData = {
    HotelName: 'Real State',
    price: 1400,
    city: 'Bogota',
    address: 'Diagonal 43 -34',
    rating: 3,
    taxes: 230,
    type: 'Premium',
    pathImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  };
  

}
