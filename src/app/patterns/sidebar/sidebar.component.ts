import { Component, OnInit } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Router } from '../../../../node_modules/@angular/router';
import { SidebarcountService } from '../../shared/services/sidebar/sidebarcount.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  displayFull: boolean = false;
  userId: number = 0;
  userName: string = '';
  userRoleId: number = 0;
  userPic: string = '';
  constructor(private _router: Router, public _sidebarCount: SidebarcountService) { }
  
  ngOnInit() {
    var userSession: any = JSON.parse(localStorage.getItem("_user"));
    this.userId = userSession.adminUserId;
    this.userName = userSession.name;
    this.userRoleId = userSession.userRoleId;
    this.userPic = userSession.photoUrl;
    // this._sidebarCount.updateCheckoutCount();
    // this._sidebarCount.updateOrderAssignCount();
    // this._sidebarCount.updateOrderPendingCount();
    // this._sidebarCount.updateEbillPendingCount();
  }
  toggleSidebar() {
    if (this.displayFull) {
      this.closeNav();
    } else {
      this.openNav();
    }
  }

  openNav() {
    document.getElementById("sidenav").classList.add("opened");
    document.getElementById("main").classList.add("opened");
    document.getElementById("navbar").classList.add("opened");
    this.displayFull = true;
  }

  closeNav() {
    document.getElementById("sidenav").classList.remove("opened");
    document.getElementById("main").classList.remove("opened");
    document.getElementById("navbar").classList.remove("opened");
    this.displayFull = false;
  }
}
