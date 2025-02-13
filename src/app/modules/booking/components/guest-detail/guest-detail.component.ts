import { Component, Input } from '@angular/core';
import { diffYears } from '@formkit/tempo';
import moment from 'moment';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { IGuestData, IEmergencyContactData } from '../../../../domains/interfaces/IGuestData';

@Component({
  selector: 'guest-detail',
  imports: [
    CardModule,
    AvatarModule
  ],
  templateUrl: './guest-detail.component.html',
  styleUrl: './guest-detail.component.scss'
})
export class GuestDetailComponent {
  @Input() isGuest = true;
  @Input() guest!: IGuestData | IEmergencyContactData;

  getFullName(){
    const fullName =  [
      this.guest.firstName,
      this.guest.secondName,
      this.guest.firstLastname,
      this.guest.secondlastname
    ]
    return fullName.join(' ')
  }

  getAge(dataGuest: IGuestData){
    const formatBirthDate = moment(dataGuest.birthDate,'DD/MM/YYYY').toDate();
    return diffYears(new Date(), formatBirthDate);
  }

  isGuestData(dataGuest: IGuestData | IEmergencyContactData): dataGuest is IGuestData{
    return 'documentNumber' in dataGuest;
  }

}
