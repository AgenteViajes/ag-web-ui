import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { StatusRoom } from '../../../../domains/enums/EStatusRoom';
import { HotelData } from '../../../../domains/interfaces/IHotelData';
import { RoomDetailData } from '../../../../domains/interfaces/IRoomData';

@Component({
  selector: 'agent-rooms-list',
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    ButtonModule,
    TagModule,
    BadgeModule,
    OverlayBadgeModule
  ],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss'
})
export class RoomsListComponent {

  @Output() selectedRoom = new EventEmitter<RoomDetailData>()

  @Input() rooms!: RoomDetailData[];
  
    constructor(private router: Router){
  
    }
    selectRoom(room: RoomDetailData) {
      this.selectedRoom.emit(room);
    }
  
    getSeverity(status: StatusRoom) {
      switch (status) {
        case StatusRoom.DISABLED:
          return 'secondary';
  
        case StatusRoom.ENABLED:
          return 'success';
  
        default:
          return 'secondary'
      }
    }

}
