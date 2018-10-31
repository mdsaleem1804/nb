import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { slideToRight } from '../../router.animations';
import { SalesreportService } from '../../shared/services/salesreport/salesreport.service';
import { SalesReport} from '../../shared/models/salesreport';
import { ApiResponse } from '../../shared/models/response';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { LoaderService } from '../../shared/services/loader/loader.service';
import { SidebarcountService } from '../../shared/services/sidebar/sidebarcount.service';
import { Title } from '../../../../node_modules/@angular/platform-browser';


@Component({
  selector: 'app-salesreport',
  templateUrl: './salesreport.component.html',
  styleUrls: ['./salesreport.component.scss'],
  animations: [slideToRight()],
  providers: [DatePipe]
})
export class SalesreportComponent implements OnInit {
  fromDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
 // toDate: Date = new Date();
 toDate: Date =  new Date(new Date().getFullYear(), new Date().getMonth() , new Date().getDate());

 
  purchasetotalAmount: number = 0;
  purchasetotalBills: number = 0;
  purchaseHeaderDetails: Array<any> = new Array<any>();

 saletotalAmount: number = 0;
 saletotalBills: number = 0;
 saleHeaderDetails: Array<any> = new Array<any>();

  responses: Response[];
    tableLoading: boolean = false;

  public date = new Date();

  constructor(
    private salesReportService: SalesreportService,
     private _messageService: MessageService,
    private _confirmationService: ConfirmationService, private datePipe: DatePipe, private _loaderService: LoaderService,
    private _sidebarCountService: SidebarcountService, private titleService: Title) {
    this.titleService.setTitle('Sales Report');
  }

  ngOnInit() {
    this.getPurchaseView();
    this.getSaleView();
  }

  getPurchaseView() {
    this.tableLoading = true;
    let input = {
     fromdate: this.fromDate,
     todate: this.toDate,
    };
    this.salesReportService.PurchaseView(input)
    
      .subscribe((data: ApiResponse) => {
        console.log(input);
        if (data.status) {
          
          this.purchaseHeaderDetails = data.data.purchaseHeaderDetails;
          this.purchasetotalAmount=data.data.totalAmount;
          this.purchasetotalBills=data.data.totalBills;
          this.tableLoading = false;
        } else {
          this._messageService.add({ severity: 'error', summary: 'Failure!', detail: data.message });
        }
      }, (error: any) => {
        console.log(error);
      });
      this.getSaleView();
  }

  getSaleView() {
    this.tableLoading = true;
    let input = {
     fromdate: this.fromDate,
     todate: this.toDate,
    };
    this.salesReportService.SaleView(input)
    
      .subscribe((data: ApiResponse) => {
        console.log(input);
        if (data.status) {
          
          this.saleHeaderDetails = data.data.saleHeaderDetails;
          this.saletotalAmount=data.data.totalAmount;
          this.saletotalBills=data.data.totalBills;
          this.tableLoading = false;
        } else {
          this._messageService.add({ severity: 'error', summary: 'Failure!', detail: data.message });
        }
      }, (error: any) => {
        console.log(error);
      });
  }


  back() {

  }

  
  
}