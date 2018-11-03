import { Component, OnInit } from '@angular/core';
import {
  Test, Item, Group, Ledger
} from '../../shared/models/master';
import { SaleHeader, SaleDetails,StockSelection} from '../../shared/models/sale';
import { MasterService } from '../../shared/services/master/master.service';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../../shared/models/response';
import { MessageService } from 'primeng/components/common/messageservice';
import { slideToRight, slideToLeft } from '../../router.animations';
import { ConfirmationService } from '../../../../node_modules/primeng/api';
import { LoaderService } from '../../shared/services/loader/loader.service';
import { Title } from '../../../../node_modules/@angular/platform-browser';

import { SalesreportService } from '../../shared/services/salesreport/salesreport.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  xTotalAmount: number = 0;
  showTable: boolean;
  tableLoading = true;
  displayDialog: boolean;
  newEntry: boolean;
  saleHeader: SaleHeader = new SaleHeader();
  arrSaleHeader: Array<SaleHeader> = new Array<SaleHeader>();

  saleDetail: SaleDetails = new SaleDetails();
  selectedSaleDetail: SaleDetails = new SaleDetails();
  arrSaleDetails: Array<SaleDetails> = new Array<SaleDetails>();
  item: Item = new Item();
  selectedItem: Item = new Item();
  items: Array<Item> = new Array<Item>();
  ledger: Ledger = new Ledger();
  ledgers: Array<Ledger> = new Array<Ledger>();
  stockView: Array<any> = new Array<any>();
  stockSelection :StockSelection =new StockSelection();
  fromDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  constructor(private masterobj: MasterService, private messageobj: MessageService, private _router: Router,
    private _confirmationService: ConfirmationService, private _route: ActivatedRoute,
    private salesReportService: SalesreportService,
    private _loaderService: LoaderService, private titleService: Title) {
    this.titleService.setTitle('sale');
  }

  ngOnInit() {

    this.itemlist();
    this.getStockView(0);
    this.ledgerlist();
  }

  saleSave(form: NgForm) {
    if (form.invalid) {
      for (const name in form.controls) {
        if (form.controls[name].invalid) {
          document.getElementsByName(name)[0].focus();
          return;
        }
      }
      return;
    }
    this._confirmationService.confirm({
      message: 'ஒரு முறை தகவல் சேகரிக்கப்பட்டுவிட்டால், நீங்கள் திரும்ப மாற்றியமைக்க முடியாது?',
      accept: () => {
        this.saleSaveProceed();
      }
    });
  }

  saleSaveDetails(form: NgForm) {
    if (form.invalid) {
      for (const name in form.controls) {
        if (form.controls[name].invalid) {
          document.getElementsByName(name)[0].focus();
          return;
        }
      }
      return;
    }
    this.save();
  }
  saleSaveProceed() {
    if (this.saleHeader.saleHeaderId == 0) {
      this.saleHeader.saleDetails = this.arrSaleDetails;
      this._loaderService.show();
      this.saleHeader.createdBy = "user";
      this.saleHeader.billDate = this.fromDate;
      this.masterobj.saleInsert(this.saleHeader)
        .subscribe((data: ApiResponse) => {
          if (data.status) {
            this.messageobj.add({ severity: 'success', summary: 'Success!', detail: data.message });
            this.saleHeader = new SaleHeader();
            this.saleDetail = new SaleDetails();
            this.arrSaleDetails = new Array<SaleDetails>();
            this.selectedSaleDetail = new SaleDetails();
          } else {
            this.messageobj.add({ severity: 'error', summary: 'Failure!', detail: data.message });
          }
          this._loaderService.hide();
        }, (error: any) => {
          console.log(error);
        });

    }
  }
  onSelect(itemId) {
    this.selectedItem = null;
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].itemId == itemId) {
        this.selectedItem = this.items[i];
      }
    }
    return this.selectedItem.itemName
  }
  calculateTotal() {
    if(this.saleDetail.stockCurrent>=this.saleDetail.qty)
    {
      this.saleDetail.total = (
        (this.saleDetail.qty * this.saleDetail.mrp) +
        ((this.saleDetail.qty * this.saleDetail.mrp) * this.saleDetail.gst / 100));
  
    }
    else{
      this.messageobj.add({ severity: 'error', summary: 'Success!', detail: "Qty Should not be greater than the Current Stock"+ this.saleDetail.stockCurrent.toString() });
    }
     }
  showDialogToAdd() {
    this.newEntry = true;
    this.saleDetail = new SaleDetails()
    this.displayDialog = true;
  }
  save() {
  
    
this.saleDetail.saleItemId=1;
    let arrSaleDetails = [...this.arrSaleDetails];
    if (this.newEntry)
      arrSaleDetails.push(this.saleDetail);
    else
      arrSaleDetails[this.arrSaleDetails.indexOf(this.selectedSaleDetail)] = this.saleDetail;
    this.arrSaleDetails = arrSaleDetails;
    this.saleDetail = null;
    this.displayDialog = false;
  }
  delete() {
    let index = this.arrSaleDetails.indexOf(this.selectedSaleDetail);
    this.arrSaleDetails = this.arrSaleDetails.filter((val, i) => i != index);
    this.saleDetail = null;
    this.displayDialog = false;
  }
  onRowSelect(event) {
    this.newEntry = false;
    this.saleDetail = this.cloneCar(event.data);
    this.displayDialog = true;
  }
  itemOnChange()
  {

   this. getStockViewById(this.saleDetail.stockId);
  }
  getStockViewById(xStockId) {
  
    this.tableLoading = true;
    let input = {
      stockId: xStockId,
    };
    this.salesReportService.StockViewById(input)

      .subscribe((data: ApiResponse) => {
        if (data.status) {
this.saleDetail.batch=data.data[0].batch;
this.saleDetail.mrp=data.data[0].mrp;
this.saleDetail.gst=data.data[0].gst;
this.saleDetail.discount=data.data[0].discount;
this.saleDetail.stockCurrent=data.data[0].stockCurrent;

             
          this.tableLoading = false;
        } else {
          this.messageobj.add({ severity: 'error', summary: 'Failure!', detail: data.message });
        }
      }, (error: any) => {
        console.log(error);
      });
  }
  cloneCar(c: SaleDetails): SaleDetails {
    let saleDetail = new SaleDetails()
    for (let prop in c) {
      saleDetail[prop] = c[prop];
    }
    return saleDetail;
  }

  itemlist() {
    this.tableLoading = true;
    this.masterobj.itemList(this.item)
      .subscribe((data: ApiResponse) => {
        if (data.status) {
          this.items = data.data;
        } else {
          this.messageobj.add({ severity: 'error', summary: 'Failure!', detail: data.message });
        }
        this.tableLoading = false;
      }, (error: any) => {
        console.log(error);
      });
  }

  getStockView(xBarCode) {
    this.tableLoading = true;
    let input = {
      barCode: xBarCode,
    };
    this.salesReportService.StockView(input)

      .subscribe((data: ApiResponse) => {

        if (data.status) {
          this.stockView = data.data;
          this.tableLoading = false;
        } else {
          this.messageobj.add({ severity: 'error', summary: 'Failure!', detail: data.message });
        }
      }, (error: any) => {
        console.log(error);
      });
  }
  ledgerlist() {

    this.tableLoading = true;
    this.masterobj.ledgerList(this.ledger)
      .subscribe((data: ApiResponse) => {
        if (data.status) {
          this.ledgers = data.data;
        } else {
          this.messageobj.add({ severity: 'error', summary: 'Failure!', detail: data.message });
        }
        this.tableLoading = false;
      }, (error: any) => {
        console.log(error);
      });
  }
}
