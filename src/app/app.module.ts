import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { LoginService } from './shared/services/login/login.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/api';

import { GrowlModule } from 'primeng/growl';
import { MessageModule } from 'primeng/message';
import { SidebarcountService } from './shared/services/sidebar/sidebarcount.service';

import { AppRoutingModule } from './/app-routing.module';






const commonRoutes: Routes = [
  { path: '', loadChildren: './patterns/layout/layout.module#LayoutModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  { path: '**', redirectTo: 'master' }
];
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GrowlModule,
    MessageModule,
    RouterModule.forRoot(commonRoutes,{ useHash: true }),
  ],
  providers: [
    LoginService,
    SidebarcountService,
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
