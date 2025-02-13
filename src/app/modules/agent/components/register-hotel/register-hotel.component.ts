import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectButton } from 'primeng/selectbutton';
import { RatingModule } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { HotelDetailData } from '../../../../domains/interfaces/IHotelData';
import { StatusRoom } from '../../../../domains/enums/EStatusRoom';
import { TagModule } from 'primeng/tag';

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
    SelectButton,
    RatingModule,
    SelectModule,
    TagModule
  ],
  templateUrl: './register-hotel.component.html',
  styleUrl: './register-hotel.component.scss'
})
export class RegisterHotelComponent implements OnInit {
  @Input() preloadData: HotelDetailData | undefined;
  cities:City[]= []
  hotelDataForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.cities = [
      { "name": "Bogotá","code": "10011" },
      { "name": "Tunja", "code": "10021" }
    ]

    this.hotelDataForm = new FormGroup({
      status: new FormControl(this.preloadData? this.preloadData.status: StatusRoom.ENABLED),
      rating: new FormControl(this.preloadData? this.preloadData.rating : 0),
      name: new FormControl(this.preloadData? this.preloadData.name : ''),
      city: new FormControl(this.preloadData? this.findCity(this.preloadData.city) : ''),
      address: new FormControl(this.preloadData? this.preloadData.address : ''),
    })
  }

  findCity(city: string){
    return this.cities[0]
  }

}
