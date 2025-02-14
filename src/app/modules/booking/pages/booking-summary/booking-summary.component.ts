import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DetailBookingComponent } from "../../components/detail-booking/detail-booking.component";
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { BookingData, BookingSummaryData } from '../../../../domains/interfaces/IBookingTableData';
import { StoreService } from '../../../shared/services/store/store.service';
import { Constants } from '../../../shared/constants/Constants';
import { Router } from '@angular/router';


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

  bookingSummary!: BookingSummaryData;

  constructor(
    private storage:StoreService,
    private router: Router
  ){}

  ngOnInit() {
    const sessionBooking= this.storage.getItemSession(Constants.storageKeys.session.bookingConfirmed);
    if (sessionBooking) {
      this.bookingSummary = sessionBooking as BookingSummaryData;
    }
  }

  goToHome(){
    this.router.navigateByUrl('/')
  }
}
