import { Component, OnInit, Input } from '@angular/core';
import { SalesreportService } from '../../shared/services/salesreport/salesreport.service';
import { ApiResponse } from '../../shared/models/response';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-stockhistory',
  templateUrl: './stockhistory.component.html',
  styleUrls: ['./stockhistory.component.scss']
})
export class StockhistoryComponent implements OnInit {

  @Input() isAdmin: boolean = true;
  @Input() isInventory: boolean = true;
  @Input() operatorId: number = 0;
  @Input() sku: string = '';
  @Input() gameBatchId: number = 0;
  @Input() getPurchasaeInvoiceNo: number = 0;
  displayPopup: boolean = false;
  tableLoading: boolean = false;
  fromDate: Date = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate());
  toDate: Date = new Date();
  stockView: boolean = true;
  stockHistory: Array<any> = new Array<any>();
  cardHistory: Array<any> = new Array<any>();
  constructor(private _salesreportService: SalesreportService, private _messageService: MessageService) { }

  ngOnInit() {
  }

  getStockHistoryData() {
    let input = {};
    input = {
      Purchaseinvoiceno: this.getPurchasaeInvoiceNo,
    };

    this.displayPopup = true;
    this.tableLoading = true;
    this._salesreportService.PurchaseViewDetails(input)
      .subscribe((data: ApiResponse) => {
        if (data.status) {
          this.stockHistory = data.data;
          this.stockView = true;
        } else {
          this._messageService.add({ severity: 'error', summary: 'Failure!', detail: data.message });
        }
        this.tableLoading = false;
      }, (error: any) => {
        console.log(error);
      });
  }



}
