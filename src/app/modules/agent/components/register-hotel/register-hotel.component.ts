import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToggleButton } from 'primeng/togglebutton';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';

interface City {
  name: string;
  code: string;
}


@Component({
  selector: 'register-hotel',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    FloatLabelModule,
    ToggleButton,
    InputNumber,
    Select
  ],
  templateUrl: './register-hotel.component.html',
  styleUrl: './register-hotel.component.scss'
})
export class RegisterHotelComponent implements OnInit {

  cities:City[]= []
  hotelDataForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.cities = [
      { "name": "Bogotá","code": "10011" },
      { "name": "Tunja", "code": "10021" }
    ]

    this.hotelDataForm = new FormGroup({
      status: new FormControl(true),
      rating: new FormControl(''),

      lastName: new FormControl(''),
      secondLastName: new FormControl(''),
      birthDate: new FormControl(''),
      gender: new FormControl(''),
      documentType: new FormControl(''),
      documentNumber: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
    })
  }

  searchCity(event:any){

  }

}
