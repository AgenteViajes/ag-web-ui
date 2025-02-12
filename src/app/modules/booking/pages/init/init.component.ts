import { Component } from '@angular/core';
import { FilterComponent } from "../../components/filter/filter.component";
import { ListComponent } from "../../components/list/list.component";

@Component({
  selector: 'booking-init',
  imports: [FilterComponent, ListComponent],
  templateUrl: './init.component.html',
  styleUrl: './init.component.scss'
})
export class InitComponent {

}
