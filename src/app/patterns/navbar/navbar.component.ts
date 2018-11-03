import { Component, OnInit, ViewChild, Pipe, PipeTransform, HostListener } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { slideToLeft } from '../../router.animations';
import { ConfirmationService } from '../../../../node_modules/primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [slideToLeft()]
})

export class NavbarComponent implements OnInit {
  showNav: boolean = false;
  display: boolean = false;
  blocked: boolean = false;
  notificationPopupOpen: boolean = false;
  screenWidth: number = 0;
  opened: string = '';


  winboxcash: number = 0;
  tradeboxcash: number = 0;

  themes: Array<any> = [
    { "name": "Light", "class": "light", "selected": true },
  ];

  @ViewChild("sidebar") sidebar: SidebarComponent;
  @ViewChild('notifications') notifications;

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement) {
    try {
      
      const clickedInside = this.notifications.nativeElement.contains(targetElement);
      if (!clickedInside) {
        this.notificationPopupOpen = false;
      }
    } catch (e) {
    }
  }

  // @HostListener('document:click')
  // onClickWhileBlocked() {
  //   if(localStorage.getItem("Locked")){
  //     if(localStorage.getItem("Locked") == "true"){
  //       //this._router.navigate(['login']);
  //     }
  //   }
  // }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  constructor(private _router: Router, private _confirmationService: ConfirmationService) {
    this.onResize();
  }

  ngOnInit() {
    this.winboxcash = 4950255;
    this.tradeboxcash = 7636355;
  }

  openNotificationPopup() {
    this.notificationPopupOpen = true
  }

  lockScreen(){
    localStorage.setItem("Locked","true");
    this.blocked = true; 
    this.display = false;
  }

  unLockScreen(returnValue) {
    localStorage.setItem("Locked","false");
    this.blocked = returnValue;
  }

  toggleSideBar() {
    this.opened = this.opened == '' ? 'opened' : '';
    this.sidebar.toggleSidebar();
  }

  activateTheme(item) {
    this.themes.forEach(function (v, i) {
      document.getElementById('app').classList.remove(v.class);
      v.selected = false;
    });
    let activate = this.themes.filter(function (v) {
      return v.name == item.name;
    })[0];
    this.themes[this.themes.indexOf(activate)].selected = true;
    document.getElementById('app').classList.add(item.class);
  }

  logout() {
    this._confirmationService.confirm({
      message: 'Are you sure that you want to logout?',
      accept: () => {
        localStorage.clear();
        this._router.navigate(['login']);
      }
    });
  }

}