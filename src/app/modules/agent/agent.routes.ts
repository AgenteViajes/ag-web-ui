
import { Routes } from '@angular/router';
import { AgentComponent } from './agent.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HotelDetailsComponent } from './pages/hotel-details/hotel-details.component';
import { DetailBookingComponent } from '../booking/components/detail-booking/detail-booking.component';

export const agentRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
    },
    {
        path: 'hotel-details',
        component: HotelDetailsComponent
    },
    {
        path: 'booking-details',
        component: DetailBookingComponent
    }
];
