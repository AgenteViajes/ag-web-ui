import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { InitComponent } from './pages/home/components/init/init.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: InitComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
