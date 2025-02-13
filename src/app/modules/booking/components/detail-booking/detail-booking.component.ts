import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { IEmergencyContactData, IGuestData } from '../../../../domains/interfaces/IGuestData';
import { Gender } from '../../../../domains/enums/EGender';
import { BookingSummaryData } from '../../../../domains/interfaces/IBookingTableData';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { SummaryRoomComponent } from '../summary-room/summary-room.component';
import { GuestDetailComponent } from "../guest-detail/guest-detail.component";


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

  bookingSummary!: BookingSummaryData;

  ngOnInit() {
    const guests: IGuestData[] = [
      {
        firstName: 'Juan',
        secondName: 'Esteban',
        firstLastname: 'Vargas',
        secondlastname: 'Alba',
        documentType: 'CC',
        documentNumber: 129393993,
        email: 'emrvargaitaz@gmail.com',
        phoneNumber: '3158992233',
        birthDate: '17/06/2001',
        gender: Gender.MALE
      },
      {
        firstName: 'Emerson',
        secondName: 'Uriel',
        firstLastname: 'Vargas',
        secondlastname: 'Alba',
        documentType: 'CC',
        documentNumber: 129393993,
        email: 'emrvargaitaz@gmail.com',
        phoneNumber: '3158992233',
        birthDate: '17/06/2001',
        gender: Gender.MALE
      },
      {
        firstName: 'Maria',
        secondName: '',
        firstLastname: 'Alba',
        secondlastname: 'Alba',
        documentType: 'CC',
        documentNumber: 129393993,
        email: 'emrvargaitaz@gmail.com',
        phoneNumber: '3158992233',
        birthDate: '17/06/2001',
        gender: Gender.MALE
      }
    ]
    const contactEmergency: IEmergencyContactData = {
      firstName: 'Emerson',
      secondName: 'Uriel',
      firstLastname: 'Vargas',
      secondlastname: 'Alba',
      phoneNumber: '3158992233'
    }
    const room = {
      id: 'BG12424',
      hotelName: 'Real State',
      price: 1400,
      city: 'Bogota',
      address: 'Diagonal 43 -34',
      rating: 3,
      taxes: 230,
      type: 'Premium',
      pathImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    };
    this.bookingSummary = {
      titularId: 0,
      guest: guests,
      emergencyContact: contactEmergency,
      idBooking: '12323ffrd',
      startDate: '19/02/2025',
      endDate: '19/02/2025',
      quantityDays: 3,
      room: room
    };
  }
}

