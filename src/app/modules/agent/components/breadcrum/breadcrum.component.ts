import { Component, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { agentConstants } from '../../constants/agentConstants';

@Component({
  selector: 'agent-breadcrumb',
  imports: [
    Breadcrumb,
    RouterModule,
    CardModule,
    CommonModule
  ],
  templateUrl: './breadcrum.component.html',
  styleUrl: './breadcrum.component.scss'
})
export class BreadcrumComponent {
  items = signal<MenuItem[]>([]);

  constructor(private router: Router){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateRoutes(this.router.url);
      }
    });
  }

  ngOnInit() {
      this.items.set([
        { 
          icon: 'pi pi-home',
          route: '/agent'
        }
      ]);
  }

  updateRoutes(path: string){
    agentConstants.breadCrumdItems.forEach((item)=>{
      if (item.route === path) {
        this.items().push(item)
      }
    })
    console.log('actualizamos la ruta : ', path, this.items())

  }
}
