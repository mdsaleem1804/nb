import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { slideToRight } from '../../router.animations';
import { SalesreportService } from '../../shared/services/salesreport/salesreport.service';
import { SalesReport} from '../../shared/models/salesreport';
import { PurchaseReport} from '../../shared/models/purchasereport';
import { PurchaseHeaderResponse} from '../../shared/models/purchase';

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

  salesReport: SalesReport = new SalesReport();
  purchaseReport: PurchaseReport = new PurchaseReport();
  fromDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
 // toDate: Date = new Date();
 toDate: Date =  new Date(new Date().getFullYear(), new Date().getMonth() , new Date().getDate());
  xPurchaseReport: Array<PurchaseHeaderResponse> = new Array<PurchaseHeaderResponse>();
  xArrPurchaseReport: Array<PurchaseHeaderResponse> = new Array<PurchaseHeaderResponse>();

  totalAmount: number = 0;
  totalBills: number = 0;
  purchaseHeaderDetails: Array<any> = new Array<any>();

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
          this.totalAmount=data.data.totalAmount;
          this.totalBills=data.data.totalBills;
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