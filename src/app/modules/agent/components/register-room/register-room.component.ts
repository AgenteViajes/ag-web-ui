import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SelectButton } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { StatusRoom } from '../../../../domains/enums/EStatusRoom';
import { TooltipModule } from 'primeng/tooltip';
import { IRoomBasic, IRoomDataForm } from '../../../../domains/interfaces/IRoomData';

@Component({
  selector: 'register-room',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    FloatLabelModule,
    SelectButton,
    SelectModule,
    InputNumberModule,
    TooltipModule
  ],
  templateUrl: './register-room.component.html',
  styleUrl: './register-room.component.scss',
})
export class RegisterRoomComponent implements OnInit,OnChanges, OnDestroy{
  @Input() preloadData: IRoomBasic | undefined;
  @Output() formDataRoom = new EventEmitter<IRoomDataForm>();
  roomDataForm: FormGroup = new FormGroup({});

  constructor(){
    this.roomDataForm = new FormGroup({
      status: new FormControl(StatusRoom.ENABLED),
      price: new FormControl(),
      taxes: new FormControl(),
      type: new FormControl(),
      location: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.roomDataForm.statusChanges.subscribe({
      next:()=>{
        this.formDataRoom.emit({
          roomData: this.roomDataForm.value,
          statusForm: this.roomDataForm.status
        })
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updatePreloadInfo(this.preloadData)
  }

  ngOnDestroy(): void {
  }

  updatePreloadInfo(dataUpdated?: IRoomBasic){
    this.roomDataForm.get('status')?.setValue(dataUpdated? dataUpdated.status: StatusRoom.ENABLED);
    this.roomDataForm.get('price')?.setValue(dataUpdated?.price);
    this.roomDataForm.get('taxes')?.setValue(dataUpdated?.taxes);
    this.roomDataForm.get('type')?.setValue(dataUpdated?.type);
    this.roomDataForm.get('location')?.setValue(dataUpdated?.location);
  }

}
