import { Component, signal } from '@angular/core';
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
import { DialogItems } from '../../../shared/interfaces/IDialogItems';
import { DialogType } from '../../../shared/enums/EDialogType';
import { RegisterRoomComponent } from "../../components/register-room/register-room.component";
import { DialogAction } from '../../../shared/enums/EDialogAction';
import { RoomDetailData } from '../../../../domains/interfaces/IRoomData';

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
export class HotelDetailsComponent {

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

  hotelDetails:HotelDetailData = {
    rating: 4,
    rooms: [],
    id: 'BG13421',
    name: 'Coco House',
    city: 'Bogota',
    address: 'Kr12 #a12 -23',
    innactivateRooms: 4,
    activateRooms: 5,
    status: StatusRoom.DISABLED
  }

  constructor(){
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
    console.log('selecionado',this.roomSelected())
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

  dialogAccept(dialogUsed: DialogItems){
    switch(dialogUsed.actionType){
      case DialogAction.HOTEL_UPDATE:
        this.updateHotelData()
        break;
      case DialogAction.ROOM_UPDATE:
        this.updateHotelData()
        break;
      case DialogAction.ROOM_REGISTER:
        this.updateHotelData()
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
