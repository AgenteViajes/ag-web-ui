import { Component, OnInit } from '@angular/core';
import { SummaryRoomComponent } from "../../components/summary-room/summary-room.component";
import { FormRegisterComponent } from "../../components/form-register/form-register.component";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { GuestDataForm, IEmergencyContactData, IGuestData } from '../../../../domains/interfaces/IGuestData';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { BookingData, BookingSummaryData } from '../../../../domains/interfaces/IBookingTableData';
import { StoreService } from '../../../shared/services/store/store.service';
import { Constants } from '../../../shared/constants/Constants';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { format } from '@formkit/tempo';


@Component({
  selector: 'booking-register',
  imports: [
    SummaryRoomComponent,
    FormRegisterComponent,
    CardModule,
    ButtonModule,
    StepperModule,
    CommonModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    MessageModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class RegisterComponent implements OnInit {
  bookingData!: BookingData;
  guestNumber!: number;
  guestData: GuestDataForm[] = [];
  showDgEmergency = false;
  bookingComplete!: BookingSummaryData;
  emergencyContact!: GuestDataForm;
  titularId!: number;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private storage: StoreService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.bookingData = this.storage.getItemSession(Constants.storageKeys.session.bookingRoom);
    this.guestNumber = this.bookingData?.guestNumber;
    this.guestData = Array.from({length: this.guestNumber})
    console.log(this.bookingData);
  }

  registerDataGuest(){
    this.showDgEmergency = true;
  }

  confirmBooking(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: '¿Confirmas la información de la reserva?',
        header: 'Perfecto, un paso más.',
        icon: 'pi pi-exclamation-circle',
        rejectButtonProps: {
            label: 'Volver',
            severity: 'secondary',
            outlined: true
        },
        acceptButtonProps: {
            label: 'Confirmar'
        },
        accept: () => {
          this.saveInfoBookingComplete()
        }
      });
  }

  updateDataGuest(event: GuestDataForm, index: number, isTitular: boolean){
    this.guestData[index] = event;
    if (event.guestData.birthDate) {
      this.guestData[index].guestData.birthDate = format(event.guestData.birthDate, 'DD/MM/YYYY');
    }
    if (isTitular) {
      this.titularId = event.guestData.documentNumber;
    }
  }

  enableRegisterData(){
    return !this.guestData.some((guestForm)=>{
      return guestForm?.statusForm !== 'VALID';
    })
  }

  getEmergencyContactInfo(event: GuestDataForm){
    console.log(event)
    this.emergencyContact= event;
  }

  saveInfoBookingComplete(){
    const guests: IGuestData[] = this.guestData.map((guestForm) => {
      return guestForm.guestData;
    })
    this.bookingComplete = {
      ...this.bookingData,
      titularId: this.titularId,
      guest: guests,
      emergencyContact: this.emergencyContact.guestData as IEmergencyContactData
    }
    this.storage.saveItemSession(Constants.storageKeys.session.bookingConfirmed, this.bookingComplete);
    //llamar api q guarda los datos
    this.showDgEmergency = false;
    this.messageService.add(
      {
        severity: 'info',
        summary: '¡Excelente!',
        detail: 'Tu reserva está lista. A tu correo llegará el detalle de la reserva',
        life: 3000
      });
    setTimeout(() => {
      this.router.navigateByUrl('/booking/summary')
    }, 3000);
  }

}
