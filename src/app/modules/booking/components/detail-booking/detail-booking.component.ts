import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { IEmergencyContactData, IGuestData } from '../../../../domains/interfaces/IGuestData';
import { Gender } from '../../../../domains/enums/EGender';
import { BookingData, BookingSummaryData } from '../../../../domains/interfaces/IBookingTableData';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { SummaryRoomComponent } from '../summary-room/summary-room.component';
import { GuestDetailComponent } from "../guest-detail/guest-detail.component";
import { UtilitiesService } from '../../../shared/services/utilities/utilities.service';
import { BookingService } from '../../services/booking/booking.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'detail-booking',
  imports: [
    CardModule,
    AvatarModule,
    SummaryRoomComponent,
    CardModule,
    TabsModule,
    CommonModule,
    GuestDetailComponent
],
  templateUrl: './detail-booking.component.html',
  styleUrl: './detail-booking.component.scss'
})
export class DetailBookingComponent implements OnInit {

  @Input() bookingSummary!: BookingSummaryData;
  RoomData!: BookingData;

  constructor(
    private utilities: UtilitiesService,
    private route: ActivatedRoute,
    private bookingService: BookingService
  ){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const bookingId = params.get('bookingId');
      if (bookingId) {
        this.getDataFromId(bookingId);
      }
    });
    if (this.bookingSummary) {
      this.RoomData = this.getRoomDetails(this.bookingSummary);
    }
  }

  getRoomDetails(bookingSummary: BookingSummaryData):BookingData{
    return {
      idBooking: bookingSummary?.idBooking,
      guestNumber: bookingSummary?.guest.length,
      startDate: bookingSummary?.startDate,
      endDate: bookingSummary?.endDate,
      quantityDays: this.utilities.calculateDaysBooking(bookingSummary?.startDate,bookingSummary?.endDate),
      room: bookingSummary?.room
    } as BookingData
  }

  getDataFromId(bookingId: string){
    this.bookingService.getBookingDetails(bookingId).subscribe({
      next:(response)=>{
        this.bookingSummary = response;
        this.RoomData = this.getRoomDetails(this.bookingSummary);
      },
      error:()=>{

      }
    })
  }
}

