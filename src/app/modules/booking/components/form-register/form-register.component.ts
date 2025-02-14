import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { GuestDataForm } from '../../../../domains/interfaces/IGuestData';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { Constants } from '../../../shared/constants/Constants';

@Component({
  selector: 'booking-form-register',
  imports: [
    CardModule,
    ReactiveFormsModule,
    InputGroupModule,
    FloatLabelModule,
    InputGroupAddonModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    DatePickerModule,
    SelectModule,
    ButtonModule
  ],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.scss'
})
export class FormRegisterComponent implements OnInit {
  @Input() isGuest = true;
  @Output() formDataGuest = new EventEmitter<GuestDataForm>();
  guestForm: FormGroup = new FormGroup({});
  typeDocuments = Constants.documentTypes;
  genderTypes = Constants.genderTypes;

  ngOnInit(): void {
    const guestVl= this.isGuest?[Validators.required]:[];
    this.guestForm = new FormGroup({
      firstName: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z\s]+')]),
      secondName: new FormControl('',[ Validators.pattern('[a-zA-Z\s]+')]),
      firstLastname: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z\s]+')]),
      secondLastname: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z\s]+')]),
      birthDate: new FormControl(null,guestVl),
      gender: new FormControl(null,guestVl),
      documentType: new FormControl(null,guestVl),
      documentNumber: new FormControl(null, guestVl),
      email: new FormControl('',[...guestVl,Validators.email]),
      phoneNumber: new FormControl(null,[Validators.required,Validators.minLength(10)]),
    })
    this.guestForm.statusChanges.subscribe({
      next:(data)=>{
        this.formDataGuest.emit({
          guestData: this.guestForm.value,
          statusForm: this.guestForm.status
        })
      }
    })
  }
}
