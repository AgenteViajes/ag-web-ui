import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DataView } from 'primeng/dataview';
import { signal } from '@angular/core';
import { RoomData } from '../../../../domains/interfaces/IRoomData';
import { Tag } from 'primeng/tag';
import { SelectItem } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'booking-list',
  imports: [
    CardModule,
    DataView,
    CommonModule,
    FormsModule,
    Tag,
    DropdownModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    TableModule,
    SelectModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [

  ]
})
export class ListComponent implements OnInit {

  hotels = signal<RoomData[]>([]);
  selectedHotel!: RoomData;
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;
  sortKey: any;

  constructor(
    private router:Router
  ) {}

  ngOnInit() {
    this.hotels.set ([
      {
        id: 'BG12424',
        hotelName: 'Real State',
        price: 1400,
        city: 'Bogota',
        address: 'Diagonal 43 -34',
        rating: 3,
        taxes: 230,
        type: 'Premium',
        pathImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        id: 'BG12332',
        hotelName: 'Real State',
        price: 2500,
        city: 'Bogota',
        address: 'avenida 12 km 12 via Tunja - leyva',
        rating: 4,
        taxes: 120,
        type: 'Standart',
        pathImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
    ])
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];
      /* this.productService.getProductsMini().then((data) => {
          this.products = data;
      }); */
  }

  selectRoom(selectedRoom: RoomData) {
    console.log('Data seleccionada', selectedRoom);
    console.log('ruta actual', this.router.url)
    this.router.navigateByUrl(`${this.router.url}/register`);
  }

  onSortChange(event: any){

  }

}
