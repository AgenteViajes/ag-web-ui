import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../../../domains/interfaces/IUser';
import { StoreService } from '../../../modules/shared/services/store/store.service';
import { Constants } from '../../../modules/shared/constants/Constants';
import { GlobalService } from '../global/global.service';
import { environments } from '@envs/environments';
import { UserCredentials, UserData } from '../../interfaces/IUserData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  currentUser$ = new BehaviorSubject<User| undefined>(undefined);
  constructor(
    private storage: StoreService,
    private global: GlobalService
  ) {
    this.currentUser$.next(this.getUserData())
  }

  getUserData(){
    return this.storage.getItemSession(Constants.storageKeys.session.user);
  }

  loginUser(userCredentials: UserCredentials): Observable<UserData>{
    const url = `${environments.URL_API_USERS}/user/login`
    return this.global.post(url, userCredentials).pipe(
      map((data)=>{
        this.storage.saveItemSession(Constants.storageKeys.session.authToken, data);
        const dataUserDecode = JSON.parse(atob(data.token.split('.')[1]));
        this.storage.saveItemSession(Constants.storageKeys.session.user, dataUserDecode);
        this.currentUser$.next(dataUserDecode);
        return {
          username: dataUserDecode.username,
          user: dataUserDecode.user,
          rol: dataUserDecode.rol
        }
      }),
      catchError((err) => {
        console.error('Error en la autenticación:', err);
        return throwError(() => new Error('Error en el login'));
      })
    )
  }
}
