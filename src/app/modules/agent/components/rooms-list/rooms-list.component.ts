import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
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

  rooms: RoomDetailData[] = [
      {
        id: 'BG1238283-baudn',
        status: StatusRoom.DISABLED,
        price: 3045,
        taxes: 120,
        type: 'Doble',
        pathImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        location: 'RL103'
      },
      {
        id: 'BG1238283-baudn',
        status: StatusRoom.ENABLED,
        price: 3045,
        taxes: 120,
        type: 'Sencilla',
        pathImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        location: 'RL103'
      },
      {
        id: 'BG1238283-baudn',
        status: StatusRoom.ENABLED,
        price: 3045,
        taxes: 120,
        type: 'Full-Doble',
        pathImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        location: 'RL103'
      }
      
    ];
  
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
