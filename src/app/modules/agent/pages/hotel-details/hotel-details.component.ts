import { Component, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { HotelDetailData } from '../../../../domains/interfaces/IHotelData';
import { StatusRoom } from '../../../../domains/enums/EStatusRoom';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { RegisterHotelComponent } from "../../components/register-hotel/register-hotel.component";
import { Dialog } from 'primeng/dialog';
import { RoomsListComponent } from "../../components/rooms-list/rooms-list.component";
import { DialogType } from '../../../shared/enums/EDialogType';
import { RegisterRoomComponent } from "../../components/register-room/register-room.component";
import { DialogAction } from '../../../shared/enums/EDialogAction';
import { RoomDetailData } from '../../../../domains/interfaces/IRoomData';
import { DialogItems } from '../../../shared/interfaces/IDialogItems';
import { StoreService } from '../../../shared/services/store/store.service';
import { Constants } from '../../../shared/constants/Constants';
import { BookingService } from '../../../booking/services/booking/booking.service';

@Component({
  selector: 'agent-hotel-details',
  imports: [
    CardModule,
    TagModule,
    ButtonModule,
    Menu,
    Dialog,
    RegisterHotelComponent,
    RoomsListComponent,
    RegisterRoomComponent
],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.scss'
})
export class HotelDetailsComponent implements OnInit{

  items: MenuItem[] = [];
  dialogTypes = DialogType;
  showDialog = false;
  dialogInfo =  signal<DialogItems>({
    title: 'Actualizacion de datos',
    labelBtnAccept: 'Actualizar',
    labelBtnCancel: 'Cancelar',
    type: DialogType.FORM_HOTEL,
    actionType: DialogAction.HOTEL_REGISTER
  })
  roomSelected = signal<RoomDetailData | undefined>(undefined);
  hotelDetails!:HotelDetailData;
  constructor(
    private storage: StoreService,
    private bookingService: BookingService
  ){
    this.items = [
      {
          label: 'Opciones',
          items: [
              {
                  label: 'Editar Datos',
                  icon: 'pi pi-pencil',
                  command: () => {
                    this.enableFormUpdateHotel();
                  }
              },
              {
                  label: 'Agregar Habitación',
                  icon: 'pi pi-plus-circle',
                  command: () => {
                    this.enableFormNewRoom();
                  }
              }
          ]
      }
    ]
  }
  ngOnInit(): void {
    const sessionHotelData = this.storage.getItemSession(Constants.storageKeys.session.agHotelSelect);
    if (sessionHotelData) {
      this.bookingService.getHotelDetails(sessionHotelData.id).subscribe({
        next:(response)=>{
          this.hotelDetails = {
            ...sessionHotelData,
            rating: response.rating,
            rooms: response.rooms
          };
        }
      });
    }
  }

  updateHotelData(){
    this.showDialog = false;
  }

  enableFormUpdateHotel(){
    this.dialogInfo.set({
      title: 'Actualizacion de datos',
      labelBtnAccept: 'Actualizar',
      labelBtnCancel: 'Cancelar',
      type: DialogType.FORM_HOTEL,
      actionType: DialogAction.HOTEL_UPDATE
    })
    this.showDialog = true;
  }
  enableFormUpdateRoom( roomUpdate: RoomDetailData){
    this.roomSelected.set(roomUpdate);
    this.dialogInfo.set({
      title: 'Actualizacion de datos',
      labelBtnAccept: 'Actualizar',
      labelBtnCancel: 'Cancelar',
      type: DialogType.FORM_ROOM,
      actionType: DialogAction.ROOM_UPDATE
    })
    this.showDialog = true;
  }
  enableFormNewRoom(){
    this.roomSelected.set(undefined);
    this.dialogInfo.set({
      title: 'Registro de nueva habitación',
      labelBtnAccept: 'Registrar',
      labelBtnCancel: 'Cancelar',
      type: DialogType.FORM_ROOM,
      actionType: DialogAction.ROOM_REGISTER
    })
    this.showDialog = true;
  }

  updateRoomData(){
    if (this.roomSelected() !== undefined) {
      this.hotelDetails.rooms = this.hotelDetails.rooms.map((room)=>{
          if(this.roomSelected()?.id === room.id){
            return this.roomSelected();
          }else{
            return room;
          }
        }) as RoomDetailData[];
    }
    this.showDialog = false;
  }

  registerRoomData(){
    this.showDialog = false;
  }

  dialogAccept(dialogUsed: DialogItems){
    switch(dialogUsed.actionType){
      case DialogAction.HOTEL_UPDATE:
        this.updateHotelData()
        break;
      case DialogAction.ROOM_UPDATE:
        this.updateRoomData()
        break;
      case DialogAction.ROOM_REGISTER:
        this.registerRoomData()
        break
    }
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
