import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RoomData } from '../../../../domains/interfaces/IRoomData';
import { Tag } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { BookingData } from '../../../../domains/interfaces/IBookingTableData';



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
    quantityDays: 5,
    room: {
      id: 'BG12424',
      hotelName: 'Real State',
      price: 1400,
      city: 'Bogota',
      address: 'Diagonal 43 -34',
      rating: 3,
      taxes: 230,
      type: 'Premium',
      pathImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    idBooking: '',
    guestNumber: 4,
    startDate: '19/02/2025',
    endDate: '23/02/2025'
  };
  

}
