import { Component, Input, input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';




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
    ButtonModule,
  ],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.scss'
})
export class FormRegisterComponent implements OnInit {
  @Input() isGuest = true;
  guestForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.guestForm = new FormGroup({
      firstName: new FormControl(''),
      secondName: new FormControl(''),
      lastName: new FormControl(''),
      secondLastName: new FormControl(''),
      birthDate: new FormControl(''),
      gender: new FormControl(''),
      documentType: new FormControl(''),
      documentNumber: new FormControl(0),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
    })
  }
}
