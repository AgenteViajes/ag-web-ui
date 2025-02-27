import { Component, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { HotelDataForm, HotelDetailData, RegisterHotel } from '../../../../domains/interfaces/IHotelData';
import { StatusRoom } from '../../../../domains/enums/EStatusRoom';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MenuItem, MessageService } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { RegisterHotelComponent } from "../../components/register-hotel/register-hotel.component";
import { Dialog } from 'primeng/dialog';
import { RoomsListComponent } from "../../components/rooms-list/rooms-list.component";
import { DialogType } from '../../../shared/enums/EDialogType';
import { RegisterRoomComponent } from "../../components/register-room/register-room.component";
import { DialogAction } from '../../../shared/enums/EDialogAction';
import { IRegisterRoom, IRoomBasic, IRoomDataForm, IUpdateRoom } from '../../../../domains/interfaces/IRoomData';
import { DialogItems } from '../../../shared/interfaces/IDialogItems';
import { StoreService } from '../../../shared/services/store/store.service';
import { Constants } from '../../../shared/constants/Constants';
import { BookingService } from '../../../booking/services/booking/booking.service';
import { ToastModule } from 'primeng/toast';

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
    RegisterRoomComponent,
    ToastModule
  ],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.scss',
  providers: [MessageService]
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
  roomSelected = signal<IRoomBasic | undefined>(undefined);
  hotelDetails!:HotelDetailData;
  newRoomData!: IRoomDataForm;
  formHotelData!: HotelDataForm;

  constructor(
    private storage: StoreService,
    private bookingService: BookingService,
    private messageService: MessageService,
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
      this.getHotelDetailsData(sessionHotelData.id);
    }
  }

  getHotelDetailsData(id: string){
    this.bookingService.getHotelDetails(id).subscribe({
      next:(response)=>{
        this.hotelDetails = response;
      }
    });
  }

  updateHotelData(){
    if (this.hotelDetails) {
      const infoUpdate: RegisterHotel = {
        name: this.formHotelData.hotelData.name,
        city: this.formHotelData.hotelData.city,
        address: this.formHotelData.hotelData.address,
        status: this.formHotelData.hotelData.status,
        rating: this.formHotelData.hotelData.rating
      }
      this.bookingService.updateHotel(infoUpdate, this.hotelDetails.id).subscribe({
        next: (response) =>{
          this.showDialog = false;
          this.getHotelDetailsData(this.hotelDetails.id);
          this.messageService.add(
            {
              severity: 'success',
              summary: 'Excelente!',
              detail: 'El Hotel se ha actualizado exitosamente',
              life: 3000
            });
        },
        error: ()=>{
          this.messageService.add(
            {
              severity: 'error',
              summary: 'Lo siento!',
              detail: 'Ha ocurrido un error al actualizar el hotel, revisa la información e intenta nuevamente',
              life: 3000
            });
        }
      });
    }
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
  enableFormUpdateRoom( roomUpdate: IRoomBasic){
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
    const dataRoomToUpdate = this.roomSelected();
    if (dataRoomToUpdate) {
      const infoRoomUpdate: IUpdateRoom = {
        price: this.newRoomData.roomData.price,
        taxes:  this.newRoomData.roomData.taxes,
        type:  this.newRoomData.roomData.type,
        status:  this.newRoomData.roomData.status,
        location:  this.newRoomData.roomData.location
      }
      this.bookingService.updateRoom(infoRoomUpdate, dataRoomToUpdate.id).subscribe({
        next: (response) =>{
          this.showDialog = false;
          this.getHotelDetailsData(this.hotelDetails.id);
          this.messageService.add(
            {
              severity: 'success',
              summary: 'Excelente!',
              detail: 'La habitación se ha actualizado exitosamente',
              life: 3000
            });
        },
        error: ()=>{
          this.messageService.add(
            {
              severity: 'error',
              summary: 'Lo siento!',
              detail: 'Ha ocurrido un error al actualizar la habitación, revisa la información e intenta nuevamente',
              life: 3000
            });
        }
      });
    }
  }

  registerRoomData(){
    const infoRoomRegister: IRegisterRoom = {
      price: this.newRoomData.roomData.price,
      taxes: this.newRoomData.roomData.taxes,
      type: this.newRoomData.roomData.type,
      pathImg: 'https://img.freepik.com/foto-gratis/muebles-madera-pared-fondo-limpio_1253-666.jpg?t=st=1740540704~exp=1740544304~hmac=0ddc4dcd417f04f696925d5edafd8dc23795ccaab39cad75ab7f75c7d1b3663f&w=1060',
      status: this.newRoomData.roomData.status,
      location: this.newRoomData.roomData.location,
      hotelId: this.hotelDetails.id,
      capacity: Math.floor(Math.random() * 10) + 1
    }
    this.bookingService.registerRoom(infoRoomRegister).subscribe({
      next: (response) =>{
        this.showDialog = false;
        this.getHotelDetailsData(this.hotelDetails.id);
        this.messageService.add(
          {
            severity: 'success',
            summary: 'Excelente!',
            detail: 'La habitación se ha registrado exitosamente',
            life: 3000
          });
      },
      error: ()=>{
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Lo siento!',
            detail: 'Ha ocurrido un error al registrar la habitación, revisa la información e intenta nuevamente',
            life: 3000
          });
      }
    });
  }
  
  saveRoomData(roomData:IRoomDataForm ){
    this.newRoomData = roomData;
  }

  saveHotelData(hotelData:HotelDataForm ){
    this.formHotelData = hotelData;
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
