import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { BreadcrumComponent } from "./components/breadcrum/breadcrum.component";

@Component({
  selector: 'app-agent',
  imports: [
    Menubar,
    CommonModule,
    ButtonModule,
    RouterModule,
    AvatarModule,
    BreadcrumComponent
],
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.scss'
})
export class AgentComponent implements OnInit{
  isHome = signal(true)
  user = {
    name: 'Emerson'
  }

  constructor(private router: Router){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHome.set(this.router.url === '/agent');
      }
    });
  }

  ngOnInit(): void {
  }


}
