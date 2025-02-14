import { Component, Input, input, signal } from '@angular/core';
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
  @Input() items = signal<MenuItem[]>([
    { 
      icon: 'pi pi-home',
      route: '/agent'
    }
  ]);

  constructor(private router: Router){
  }

  ngOnInit() {}

}
