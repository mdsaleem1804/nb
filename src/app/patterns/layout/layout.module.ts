import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import{ MasterService } from '../../shared/services/master/master.service';

import { LayoutComponent } from './layout.component';
import { StockhistoryComponent } from '../stockhistory/stockhistory.component';
import { MasterComponent } from '../../pages/master/master.component';
import { PurchaseComponent } from '../../pages/purchase/purchase.component';
import { SalesComponent } from '../../pages/sales/sales.component';
import { SalesreportComponent } from '../../pages/salesreport/salesreport.component';
import { NavbarComponent } from './../../patterns/navbar/navbar.component';
import { SidebarComponent } from './../../patterns/sidebar/sidebar.component';


import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { BlockUIModule } from 'primeng/blockui';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import {StepsModule} from 'primeng/steps';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import {TabViewModule} from 'primeng/tabview';
import { ChartModule } from 'primeng/chart';

import { AutofocusDirective } from '../../shared/directives/autofocus.directive';
import { AutofocusModule } from 'angular-autofocus-fix';
// Import PrimeNG modules
import {DataTableModule, ButtonModule, SharedModule} from 'primeng/primeng';
const layoutRoutes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      //{ path: '', component: DashboardComponent },
      { path: 'sales-report', component: SalesreportComponent },
      { path: 'master', component: MasterComponent },
      { path: 'purchase', component: PurchaseComponent },
      { path: 'sales', component: SalesComponent },
      
      //{ path: '**', redirectTo: 'dashboard' }
    ]
  },

];
@NgModule({
  imports: [
   
    FormsModule,
    CardModule,
    CommonModule,
    SidebarModule,
    BlockUIModule,
    TooltipModule,
    FieldsetModule,
    FileUploadModule,
    CalendarModule,
    CheckboxModule,
    DialogModule,
    ConfirmDialogModule,
    TableModule,
    StepsModule,
    PanelModule,
    RadioButtonModule,
    DropdownModule,
    AutoCompleteModule,
    TabViewModule,
    ChartModule,
    DataTableModule, ButtonModule, SharedModule,
    AutofocusModule,
    RouterModule.forChild(layoutRoutes)
  ],
  declarations: [
    LayoutComponent,
    NavbarComponent,
    SidebarComponent, 
    SalesreportComponent,
    StockhistoryComponent,
    MasterComponent,
    PurchaseComponent,
    SalesComponent,
    AutofocusDirective,
  ],
  exports: [RouterModule],
  providers: [MasterService]
})
export class LayoutModule { }
