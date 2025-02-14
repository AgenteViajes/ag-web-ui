import { Component, OnInit } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import {StyleClassModule} from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../core/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-login',
  imports: [
    CheckboxModule,
    ReactiveFormsModule,
    StyleClassModule,
    ButtonModule,
    PasswordModule,
    InputGroupModule,
    FloatLabelModule,
    InputGroupAddonModule,
    FormsModule,
    InputTextModule,
    SelectModule,
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    
  ){}

  ngOnInit(): void { 
    this.loginForm = new FormGroup({
        email: new FormControl('',[Validators.required,Validators.email]),
        password: new FormControl('',[Validators.required,Validators.minLength(8)]),
      })
  }

  logginUser(){
    this.authService.loginUser(this.loginForm.value).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('/agent');
      },
      error:()=>{
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Lo sentimos',
            detail: 'Ha ocurrido un error, tu inicio de sesion no fue exitoso',
            life: 3000
          });
      }
    })
  }

}
