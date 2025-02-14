import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectButton } from 'primeng/selectbutton';
import { RatingModule } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { HotelDataForm, HotelDetailData } from '../../../../domains/interfaces/IHotelData';
import { StatusRoom } from '../../../../domains/enums/EStatusRoom';
import { TagModule } from 'primeng/tag';
import { UtilitiesService } from '../../../shared/services/utilities/utilities.service';
import { GuestDataForm } from '../../../../domains/interfaces/IGuestData';

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
  @Output() formDataHotel = new EventEmitter<HotelDataForm>();
  cities:City[]= []
  hotelDataForm: FormGroup = new FormGroup({});
  constructor(
    private utilities: UtilitiesService
  ){

  }

  ngOnInit(): void {
    this.utilities.getCities().subscribe({
      next: (cities)=>{
        this.cities= cities;
      }
    })
    this.hotelDataForm = new FormGroup({
      status: new FormControl(this.preloadData? this.preloadData.status: StatusRoom.ENABLED),
      rating: new FormControl(this.preloadData? this.preloadData.rating : 0),
      name: new FormControl(this.preloadData? this.preloadData.name : ''),
      city: new FormControl(this.preloadData? this.preloadData.city : null),
      address: new FormControl(this.preloadData? this.preloadData.address : ''),
    })

    this.hotelDataForm.statusChanges.subscribe({
      next:()=>{
        this.formDataHotel.emit({
          hotelData: this.hotelDataForm.value,
          statusForm: this.hotelDataForm.status
        })
      }
    })
  }

}
