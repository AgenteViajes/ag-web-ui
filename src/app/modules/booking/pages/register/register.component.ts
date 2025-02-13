import { Component, OnInit } from '@angular/core';
import { SummaryRoomComponent } from "../../components/summary-room/summary-room.component";
import { FormRegisterComponent } from "../../components/form-register/form-register.component";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { IGuestData } from '../../../../domains/interfaces/IGuestData';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { Gender } from '../../../../domains/enums/EGender';


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
  guestNumber!: number;
  guestData!: IGuestData[];
  showDgEmergency = false;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.guestNumber = 4;
    this.guestData = this.createGuestListEmpty(this.guestNumber);
  }

  createGuestListEmpty(guestNumber: number): IGuestData[] {
    const fillArray: IGuestData[] = [];
    for (let index = 0; index < guestNumber; index++) {
      fillArray.push(
        {
          firstName: '',
          secondName: '',
          firstLastname: '',
          secondlastname: '',
          documentType: '',
          documentNumber: 0,
          email: '',
          phoneNumber: '',
          birthDate: '',
          gender: Gender.FEMALE
        }
      )
    }
    return fillArray;
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
          this.showDgEmergency = false;
          this.messageService.add({ severity: 'info', summary: '¡Excelente!', detail: 'Tu reserva está lista. A tu correo llegará el detalle de la reserva', life: 5000 });
        }
      });
  }

}
