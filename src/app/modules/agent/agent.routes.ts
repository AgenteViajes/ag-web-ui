
import { Routes } from '@angular/router';
import { AgentComponent } from './agent.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const agentRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
    }
];
