
import { Routes } from '@angular/router';
import { InitComponent } from './pages/init/init.component';
import { RegisterComponent } from './pages/register/register.component';
import { BookingComponent } from './booking.component';
import { BookingSummaryComponent } from './pages/booking-summary/booking-summary.component';

export const bookingRoutes: Routes = [
    {
        path: '',
        component: InitComponent,
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'summary',
        component: BookingSummaryComponent
    }
];
