import { Routes } from '@angular/router';
import { bookingRoutes } from './modules/booking/booking.routes';
import { HomeComponent } from './modules/shared/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { DashboardComponent } from './modules/agent/pages/dashboard/dashboard.component';
import { AgentComponent } from './modules/agent/agent.component';
import { agentRoutes } from './modules/agent/agent.routes';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'booking',
        pathMatch: 'full'
    },
    {
        path: 'booking',
        component: HomeComponent,
        children: bookingRoutes
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'agent',
        canActivate: [],
        component: AgentComponent,
        children: agentRoutes
    }
];
