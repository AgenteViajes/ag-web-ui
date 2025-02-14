import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RoomData } from '../../../../domains/interfaces/IRoomData';
import { Tag } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { BookingData } from '../../../../domains/interfaces/IBookingTableData';
import { StoreService } from '../../../shared/services/store/store.service';
import { CurrencyPipe } from '@angular/common';



@Component({
  selector: 'booking-summary-room',
  imports: [
    CardModule,
    Tag,
    DividerModule,
    CurrencyPipe
  ],
  templateUrl: './summary-room.component.html',
  styleUrl: './summary-room.component.scss'
})
export class SummaryRoomComponent implements OnInit{

  @Input() selectedRoom!: BookingData;
  constructor(
    private storage: StoreService
  ){}

  ngOnInit(): void {
  }
}
