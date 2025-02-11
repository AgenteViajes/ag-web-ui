import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { BookingData } from '../../../../domains/bookingData';

@Component({
  selector: 'booking-list',
  imports: [
    CardModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    TableModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  hotels!: BookingData[];
  selectedHotel!: BookingData;

  constructor() {}

  ngOnInit() {
    this.hotels = [
      {
        HotelName: 'Real State',
        price: 1400,
        location: 'Bogota',
        Type: 'Standart'
      },
      {
        HotelName: 'Real State',
        price: 2500,
        location: 'Bogota',
        Type: 'Premium'
      },
    ]
      /* this.productService.getProductsMini().then((data) => {
          this.products = data;
      }); */
  }

  selectProduct(hotel: BookingData) {
      //this.messageService.add({ severity: 'info', summary: 'Hotel Selected', detail: hotel.HotelName });
  }

}
