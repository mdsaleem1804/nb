import { Component, OnInit } from '@angular/core';
import { slideToBottom } from '../../router.animations';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/services/login/login.service';
import { Admin } from '../../shared/models/user';
import { ApiResponse } from '../../shared/models/response';

import { MessageService } from 'primeng/components/common/messageservice';
import { LoaderService } from '../../shared/services/loader/loader.service';
import { Title } from '../../../../node_modules/@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [slideToBottom()]
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  showLogin: boolean = true;
  admin: Admin = new Admin();
  constructor(private _router: Router, private _loginService: LoginService, 
    private _loaderService: LoaderService, private _messageService: MessageService, private titleService: Title) { 
      this.titleService.setTitle('Demo Version- Login');
    }

    ngOnInit() {
      localStorage.setItem("Locked","false");
    }
    login() {

      let that = this;
      this._loaderService.show();
      this._loginService.login(this.admin)
        .subscribe((data: ApiResponse) => {
          if (data.status) {
            this.showLogin = false;
            localStorage.setItem("_user",JSON.stringify(data.data));
            this._messageService.add({ severity: 'success', summary: 'Login Success!', detail: data.message });
            setTimeout(function () {
              that._router.navigate(['/master']);
            }, 300);
          } else {
            this._messageService.add({ severity: 'error', summary: 'Login Failed!', detail: data.message });
          }
          this._loaderService.hide();
        }, (error: any) => {
          console.log(error);
        });
    }
}
