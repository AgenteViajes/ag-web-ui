import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { HotelsListComponent } from "../../components/hotels-list/hotels-list.component";
import { Dialog } from 'primeng/dialog';
import { RegisterHotelComponent } from "../../components/register-hotel/register-hotel.component";
import { BookingListComponent } from "../../components/booking-list/booking-list.component";
import { HotelData, HotelDataForm, RegisterHotel } from '../../../../domains/interfaces/IHotelData';
import { MessageService } from 'primeng/api';
import { BookingService } from '../../../booking/services/booking/booking.service';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { StoreService } from '../../../shared/services/store/store.service';
import { Constants } from '../../../shared/constants/Constants';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    CardModule,
    TabsModule,
    TableModule,
    ButtonModule,
    TagModule,
    BadgeModule,
    OverlayBadgeModule,
    HotelsListComponent,
    Dialog,
    RegisterHotelComponent,
    BookingListComponent,
    ToastModule
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [MessageService]

})
export class DashboardComponent {

  showDgRegisterHotel = false;
  registerHotelinfo!: HotelDataForm;

   constructor(
      private messageService: MessageService,
      private bookingService: BookingService,
      private storage: StoreService,
      private router: Router,
    ){}

  registerHotelData(hotelData:HotelDataForm ){
    this.registerHotelinfo = hotelData;
  }

  openRegisterHotelDialog(){
    this.showDgRegisterHotel = true;
  }

  registerHotel(){
    const dataRegister: RegisterHotel = {
      rating: this.registerHotelinfo.hotelData.rating,
      name: this.registerHotelinfo.hotelData.name,
      city: this.registerHotelinfo.hotelData.city,
      address: this.registerHotelinfo.hotelData.address,
      status: this.registerHotelinfo.hotelData.status
    }
    this.bookingService.registerHotel(dataRegister).subscribe({
      next: ()=>{
        this.messageService.add(
          {
            severity: 'success',
            summary: 'Excelente!',
            detail: 'El hotel se ha registrado exitosamente',
            life: 3000
          });
        this.showDgRegisterHotel = false;
      }
    })
  }

  showHotelDetails(hotelselected: HotelData){
    this.storage.saveItemSession(Constants.storageKeys.session.agHotelSelect,hotelselected);
    this.router.navigateByUrl(`${this.router.url}/hotel-details`);
  }
}
