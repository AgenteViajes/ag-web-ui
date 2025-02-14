import { Routes } from '@angular/router';
import { bookingRoutes } from './modules/booking/booking.routes';
import { HomeComponent } from './modules/shared/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { DashboardComponent } from './modules/agent/pages/dashboard/dashboard.component';
import { AgentComponent } from './modules/agent/agent.component';
import { agentRoutes } from './modules/agent/agent.routes';
import { authGuard } from './core/guards/auth/auth.guard';
import { RolUser } from './domains/enums/ERolUser';

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
        data: {
            roles: [RolUser.AGENT]
        },
        canMatch: [ authGuard ],
        canActivate: [],
        component: AgentComponent,
        children: agentRoutes
    }
];
