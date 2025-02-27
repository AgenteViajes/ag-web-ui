import { Component, EventEmitter, Input, OnInit, Output, Signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
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
    SelectModule,
    CurrencyPipe
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [

  ]
})
export class ListComponent implements OnInit {

  @Input() roomsList = signal<RoomData[]>([]);
  @Output() roomSelected= new EventEmitter<RoomData>();
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField: string = 'price';
  sortKey: any;

  constructor() {}

  ngOnInit() {
    this.sortOptions = [
      { label: 'Mayor a menor precio', value: -1 },
      { label: 'Menor a mayor precio', value: 1 },
    ];
  }

  selectRoom(selectedRoom: RoomData) {
    this.roomSelected.emit(selectedRoom);
  }

  onSortChange(event: any){
    this.sortOrder = event.value;
  }

}
