import { Component, OnInit, signal } from '@angular/core';
import { FilterComponent } from "../../components/filter/filter.component";
import { ListComponent } from "../../components/list/list.component";
import { RoomFilter } from '../../../../domains/interfaces/IRoomFilter';
import { BookingService } from '../../services/booking/booking.service';
import { RoomData } from '../../../../domains/interfaces/IRoomData';
import { Router } from '@angular/router';
import { BookingData } from '../../../../domains/interfaces/IBookingTableData';
import { UtilitiesService } from '../../../shared/services/utilities/utilities.service';
import { StoreService } from '../../../shared/services/store/store.service';
import { Constants } from '../../../shared/constants/Constants';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'booking-init',
  imports: [
    FilterComponent,
    ListComponent,
    ToastModule,
    CardModule,
    SkeletonModule
  ],
  templateUrl: './init.component.html',
  styleUrl: './init.component.scss',
  providers: [ MessageService]
})
export class InitComponent implements OnInit{
  roomsFiltered = signal<RoomData[]>([]);
  searchParams!: RoomFilter;
  isLoading = false;
  constructor(
    private bookingService: BookingService,
    private router: Router,
    private utilities: UtilitiesService,
    private messageService: MessageService,
    private storage: StoreService
  ){

  }
  ngOnInit(): void {
    this.preloadData();
  }

  findBooking(event: RoomFilter){
    this.isLoading = true;
    this.searchParams = event;
    this.bookingService.findRooms(event).subscribe({
      next:(data)=>{
        this.isLoading = false;
        this.roomsFiltered.set(data);
        this.storage.saveItemSession(Constants.storageKeys.session.roomsFound,data);
      }
    })
  }

  buildData(selectedRoom: RoomData): BookingData{
    const bookingDays = this.utilities.calculateDaysBooking(this.searchParams.startDate,this.searchParams.endDate);
    return {
      quantityDays: bookingDays,
      room: selectedRoom,
      idBooking: '',
      guestNumber: this.searchParams.peopleCount,
      startDate: this.searchParams.startDate,
      endDate: this.searchParams.endDate
    };
  }

  registerBooking(selectedRoom: RoomData){
    if (this.searchParams) {
      const bookingData = this.buildData(selectedRoom);
      this.storage.saveItemSession(Constants.storageKeys.session.bookingRoom,bookingData);
      this.router.navigateByUrl('/booking/register');
    }else{
      console
      this.messageService.add(
        {
          severity: 'warn',
          summary: '¡Espera!',
          detail: 'Aun no has diligenciado la informacion de busqueda',
          life: 5000
        });
    }
  }

  preloadData(){
    this.isLoading = true;
    const sessionRooms = this.storage.getItemSession(Constants.storageKeys.session.roomsFound);
    const searchParams = this.storage.getItemSession(Constants.storageKeys.session.searchBkParams);
    if (sessionRooms && searchParams) {
      this.roomsFiltered.set(sessionRooms);
      this.searchParams = searchParams;
      this.isLoading = false;
    }else{
      this.bookingService.findAllRooms().subscribe({
        next: (response)=>{
          this.roomsFiltered.set(response);
          this.searchParams = undefined as unknown as RoomFilter;
          this.isLoading = false;
        },
        error:(error)=>{
        }
      })
    }
  }


}
