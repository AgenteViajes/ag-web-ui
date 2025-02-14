import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../domains/interfaces/IUser';
import { StoreService } from '../../../modules/shared/services/store/store.service';
import { Constants } from '../../../modules/shared/constants/Constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  currentUser$ = new BehaviorSubject<User| undefined>(undefined);
  constructor(
    private storage: StoreService
  ) {
    this.currentUser$.next(this.getUserData())
  }

  getUserData(){
    return this.storage.getItemSession(Constants.storageKeys.session.user);
  }
}
