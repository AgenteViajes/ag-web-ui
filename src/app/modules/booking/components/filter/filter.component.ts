import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { BookingFilter } from '../../../../domains/interfaces/bookingFilter';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';

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
    FormsModule,
    DatePickerModule,
    ButtonModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit{
  filters: BookingFilter = {
    startDate: '',
    endDate: '',
    location: '',
    peopleCount: 0
  }
  filtersForm!: FormGroup;

  ngOnInit(): void {
    this.filtersForm = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl(),
      location: new FormControl(''),
      peopleCount: new FormControl(),
    })
  }

}
