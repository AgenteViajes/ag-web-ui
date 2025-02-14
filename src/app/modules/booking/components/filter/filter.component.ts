import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { RoomFilter } from '../../../../domains/interfaces/IRoomFilter';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { UtilitiesService } from '../../../shared/services/utilities/utilities.service';
import { SelectModule } from 'primeng/select';
import { addHour, format } from '@formkit/tempo';
import { Constants } from '../../../shared/constants/Constants';
import { StoreService } from '../../../shared/services/store/store.service';
import moment from 'moment';

@Component({
  selector: 'booking-filter',
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    FloatLabelModule,
    InputTextModule,
    InputNumberModule,
    DatePickerModule,
    SelectModule,
    FormsModule,
    ButtonModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit{
  @Output() filtersApply = new EventEmitter<RoomFilter>()

  filtersForm!: FormGroup;
  cities: string[] = [];
  minDate = moment().startOf('day').toDate();

  constructor(
    private utilities: UtilitiesService,
    private storage: StoreService
  ){
    this.utilities.getCities().subscribe({
      next: (response)=>{
        this.cities = response;
      }
    });
  }

  ngOnInit(): void {
    this.filtersForm = new FormGroup({
      dates: new FormControl(undefined,[Validators.required]),
      city: new FormControl(undefined,[Validators.required]),
      peopleCount: new FormControl(undefined,[Validators.required]),
    })
    this.preloadData();
   
  }

  findbyFilters(){
    const formFilters = this.filtersForm.value;
    const filters: RoomFilter = {
      startDate: format(formFilters.dates[0], Constants.dateFormat),
      endDate: format(formFilters.dates[1], Constants.dateFormat),
      city: formFilters.city,
      peopleCount: formFilters.peopleCount
    }
    this.storage.saveItemSession(Constants.storageKeys.session.searchBkParams,filters);
    this.filtersApply.emit(filters)
  }

  preloadData(){
    const sessionData = this.storage.getItemSession(Constants.storageKeys.session.searchBkParams);
    const datesArray = [];
    datesArray.push(addHour(moment(sessionData?.startDate,'DD/MM/YYYY').toDate(),23));
    datesArray.push(moment(sessionData?.endDate,'DD/MM/YYYY').toDate());
    if (sessionData) {
      const prevDataForm = {
        dates:datesArray,
        city: sessionData?.city,
        peopleCount: sessionData?.peopleCount
      }
      this.filtersForm.patchValue(prevDataForm);
    }
  }

}
