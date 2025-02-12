import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { HotelsListComponent } from "../../components/hotels-list/hotels-list.component";
import { Dialog } from 'primeng/dialog';
import { RegisterHotelComponent } from "../../components/register-hotel/register-hotel.component";

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    CardModule,
    TabsModule,
    TableModule,
    ButtonModule,
    TagModule,
    BadgeModule,
    OverlayBadgeModule,
    HotelsListComponent,
    Dialog,
    RegisterHotelComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  showDgRegisterHotel = false;

  registerHotel(){
    this.showDgRegisterHotel = true;
  }
}
