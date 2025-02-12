
import { Routes } from '@angular/router';
import { InitComponent } from './pages/init/init.component';
import { RegisterComponent } from './pages/register/register.component';

export const bookingRoutes: Routes = [
    {
        path: '',
        component: InitComponent,
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];
