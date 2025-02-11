import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import {StyleClassModule} from 'primeng/styleclass';

@Component({
  selector: 'app-login',
  imports: [
    CheckboxModule,
    StyleClassModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
