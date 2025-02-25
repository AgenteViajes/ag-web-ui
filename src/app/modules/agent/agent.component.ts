import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { BreadcrumComponent } from "./components/breadcrum/breadcrum.component";
import { StoreService } from '../shared/services/store/store.service';
import { UserData } from '../../core/interfaces/IUserData';
import { Constants } from '../shared/constants/Constants';
import { MenuItem } from 'primeng/api';
import { agentConstants } from './constants/agentConstants';

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
  avatarUrl = '@resources/profile.png'
  breadCrumbItems = signal<MenuItem[]>([])
  user!: UserData

  constructor(
    private router: Router,
    private storage: StoreService
  ){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHome.set(this.router.url === '/agent');
        this.updateRoutes(this.router.url);
      }
    });
  }

  ngOnInit(): void {
    this.user = this.storage.getItemSession(Constants.storageKeys.session.user);
    this.breadCrumbItems.set([
      { 
        icon: 'pi pi-home',
        route: '/agent'
      }
    ]);
  }

  
  updateRoutes(path: string){
    const items:MenuItem[] = [
      { 
        icon: 'pi pi-home',
        route: '/agent'
      }
    ];
    agentConstants.breadCrumdItems.forEach((item)=>{
      if (path.includes(item.route)) {
        items.push(item)
      }
    })
    this.breadCrumbItems.set(items);
  }


}
