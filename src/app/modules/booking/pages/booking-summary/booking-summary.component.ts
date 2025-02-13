import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DetailBookingComponent } from "../../components/detail-booking/detail-booking.component";
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'booking-summary',
  imports: [
    CardModule,
    DetailBookingComponent,
    TabsModule,
    ButtonModule,
    CommonModule
],
  templateUrl: './booking-summary.component.html',
  styleUrl: './booking-summary.component.scss'
})
export class BookingSummaryComponent implements OnInit {

  ngOnInit() {
    
  }
}
