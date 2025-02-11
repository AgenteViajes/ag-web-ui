import { Component } from '@angular/core';
import { FilterComponent } from "./components/filter/filter.component";
import { ListComponent } from "./components/list/list.component";

@Component({
  selector: 'app-booking',
  imports: [FilterComponent, ListComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {

}
