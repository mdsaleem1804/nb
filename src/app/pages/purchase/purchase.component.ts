import { Component, OnInit } from '@angular/core';
import {
  Test, Item, Group, Ledger
} from '../../shared/models/master';
import { PurchaseHeader, PurchaseDetails } from '../../shared/models/purchase';
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
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  xTotalAmount: number = 0;
  showTable: boolean;
  tableLoading = true;
  displayDialog: boolean;
  newEntry: boolean;
  purchaseHeader: PurchaseHeader = new PurchaseHeader();
  arrPurchaseHeader: Array<PurchaseHeader> = new Array<PurchaseHeader>();

  purchasedetail: PurchaseDetails = new PurchaseDetails();
  selectedPurchaseDetail: PurchaseDetails = new PurchaseDetails();
  arrPurchaseDetails: Array<PurchaseDetails> = new Array<PurchaseDetails>();
  item: Item = new Item();
  selectedItem: Item = new Item();
  items: Array<Item> = new Array<Item>();
  ledger: Ledger = new Ledger();
  ledgers: Array<Ledger> = new Array<Ledger>();
  fromDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  constructor(private masterobj: MasterService, private messageobj: MessageService, 
    private _router: Router,
    private salesReportService: SalesreportService,
    private _confirmationService: ConfirmationService, private _route: ActivatedRoute,
    private _loaderService: LoaderService, private titleService: Title) {
    this.titleService.setTitle('Purchase');
  }

  ngOnInit() {

    this.itemlist();
    this.ledgerlist();
    this. getPurchaseView();
  }
  getPurchaseView() {
    this.tableLoading = true;
    let input = {

    };
    this.salesReportService.PurchaseView(input)
    
      .subscribe((data: ApiResponse) => {

        if (data.status) {

          this.purchaseHeader.purchaseHeaderId=data.data.maxId;
          this.tableLoading = false;
        } else {
        }
      }, (error: any) => {
        console.log(error);
      });

  }

  purchaseSave(form: NgForm) {
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
        this.purchaseSaveProceed();
      }
    });
  }

  purchaseSaveDetails(form: NgForm) {
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
  purchaseSaveProceed() {
    //if (this.purchaseHeader.purchaseHeaderId == 0) {
      this.purchaseHeader.purchaseDetails = this.arrPurchaseDetails;
      this._loaderService.show();
       this.purchaseHeader.createdBy = "user";
       this.purchaseHeader.billDate=this.fromDate;
      console.log(this.purchaseHeader);
      this.masterobj.purchaseInsert(this.purchaseHeader)
        .subscribe((data: ApiResponse) => {
          if (data.status) {
            this.messageobj.add({ severity: 'success', summary: 'Success!', detail: data.message });
            this.purchaseHeader = new PurchaseHeader();

          } else {
            this.messageobj.add({ severity: 'error', summary: 'Failure!', detail: data.message });
          }
          this._loaderService.hide();
        }, (error: any) => {
          console.log(error);
        });
        this.purchasedetail = new PurchaseDetails();
        this.arrPurchaseDetails = new Array<PurchaseDetails>();
        this.selectedPurchaseDetail = new PurchaseDetails();
   // }
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
    this.purchasedetail.total = (
      (this.purchasedetail.qty * this.purchasedetail.price)+
    ((this.purchasedetail.qty * this.purchasedetail.price)*this.purchasedetail.gst/100));
  }
  showDialogToAdd() {
    this.newEntry = true;
    this.purchasedetail = new PurchaseDetails()
    this.displayDialog = true;
  }
  save() {
    let arrPurchaseDetails = [...this.arrPurchaseDetails];
    if (this.newEntry)
      arrPurchaseDetails.push(this.purchasedetail);
    else
      arrPurchaseDetails[this.arrPurchaseDetails.indexOf(this.selectedPurchaseDetail)] = this.purchasedetail;
    this.arrPurchaseDetails = arrPurchaseDetails;
    this.purchasedetail = null;
    this.displayDialog = false;
  }
  delete() {
    let index = this.arrPurchaseDetails.indexOf(this.selectedPurchaseDetail);
    this.arrPurchaseDetails = this.arrPurchaseDetails.filter((val, i) => i != index);
    this.purchasedetail = null;
    this.displayDialog = false;
  }
  onRowSelect(event) {
    this.newEntry = false;
    this.purchasedetail = this.cloneCar(event.data);
    this.displayDialog = true;
  }
  cloneCar(c: PurchaseDetails): PurchaseDetails {
    let purchasedetail = new PurchaseDetails()
    for (let prop in c) {
      purchasedetail[prop] = c[prop];
    }
    return purchasedetail;
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
