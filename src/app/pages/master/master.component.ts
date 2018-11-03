import { Component, OnInit } from '@angular/core';
import {
  Item, Group, Ledger
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

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
  animations: [slideToLeft(), slideToRight()]

})
export class MasterComponent implements OnInit {

  showTable: boolean;
  tableLoading = true;
  disabled: boolean = false;
  mainpage: boolean = true;
  type: string = '';

  ledger: Ledger = new Ledger();
  ledgers: Array<Ledger> = new Array<Ledger>();

  group: Group = new Group();
  groups: Array<Group> = new Array<Group>();

  item: Item = new Item();
  items: Array<Item> = new Array<Item>();

  userId: number = 0;

  constructor(private masterobj: MasterService, private messageobj: MessageService, private _router: Router,
    private _confirmationService: ConfirmationService, private _route: ActivatedRoute,
    private _loaderService: LoaderService, private titleService: Title) {
    this.titleService.setTitle('Masters');
  }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem("_user")).retailerUserId;

    this._route
      .queryParams
      .subscribe(params => {
        if (params['type']) {
          this.showTable = true;
          this.mainpage = false;
          if (params['type'] == "ledger") {
            this.type = "ledger";
            this.ledgerList();
          }


          else if (params['type'] == "group") {
            this.type = "group";
            this.groupList();
          }

          else if (params['type'] == "item") {
            this.itemlist();
            this.type = "item";
          }
      
        } else {
          this.mainpage = true;
          this.showTable = false;
        }
      });
  }
  back() {
    this.type = '';
    this.disabled = false;
    this.showTable = false;
    this.mainpage = true;
    this._router.navigate(['/master']);
    this.group = new Group();
  }
  groupsave(form: NgForm) {
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
      message: 'Are you sure that you want to save the Group?',
      accept: () => {
        this.groupsaveProceed();
      }
    });
  }
  groupsaveProceed() {
    if (this.group.groupId == 0) {
      this._loaderService.show();
      this.group.createdBy = "user";
      this.masterobj.groupInsert(this.group)
        .subscribe((data: ApiResponse) => {
          if (data.status) {
            this.messageobj.add({ severity: 'success', summary: 'Success!', detail: data.message });
            this.group = new Group();
            this.type = "group";
            this.groupList();
          } else {
            this.messageobj.add({ severity: 'error', summary: 'Failure!', detail: data.message });
          }
          this._loaderService.hide();
        }, (error: any) => {
          console.log(error);
        });
    } else {
      // this.proof.updatedBy = this.userId.toString();
      this._loaderService.show();
      this.group.updatedBy = "user";
      this.masterobj.groupUpdate(this.group)
        .subscribe((data: ApiResponse) => {
          if (data.status) {
            this.messageobj.add({ severity: 'success', summary: 'Success!', detail: data.message });
            this.group = new Group();
            this.type = "group";
            this.groupList();
          } else {
            this.messageobj.add({ severity: 'error', summary: 'Failure!', detail: data.message });
          }
          this._loaderService.hide();
        }, (error: any) => {
          console.log(error);
        });
    }
  }
  bindGroupData(id) {
    this.group.groupId = id;
    this._loaderService.show();
    this.masterobj.groupList(this.group)
      .subscribe((data: ApiResponse) => {
        if (data.status) {
          this.group = data.data[0];
        } else {
          this.messageobj.add({ severity: 'error', summary: 'Failure!', detail: data.message });
        }
        this._loaderService.hide();
      }, (error: any) => {
        console.log(error);
      });
  }
  groupList() {
    this.tableLoading = true;
    this.masterobj.groupList(this.group)
      .subscribe((data: ApiResponse) => {
        if (data.status) {
          this.groups = data.data;
        } else {
          this.messageobj.add({ severity: 'error', summary: 'Failure!', detail: data.message });
        }
        this.tableLoading = false;
      }, (error: any) => {
        console.log(error);
      });
  }

  ledgersave(form: NgForm) {
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
      message: 'Are you sure that you want to save the Ledger?',
      accept: () => {
        this.ledgersaveProceed();
      }
    });
  }
  ledgersaveProceed() {
    if (this.ledger.ledgerId == 0) {
      this._loaderService.show();
      this.ledger.createdBy = "user";
      this.masterobj.ledgerInsert(this.ledger)
        .subscribe((data: ApiResponse) => {
          if (data.status) {
            this.messageobj.add({ severity: 'success', summary: 'Success!', detail: data.message });
            this.ledger = new Ledger();
            this.type = "ledger";
            this.ledgerList();
          } else {
            this.messageobj.add({ severity: 'error', summary: 'Failure!', detail: data.message });
          }
          this._loaderService.hide();
        }, (error: any) => {
          console.log(error);
        });
    } else {
      // this.proof.updatedBy = this.userId.toString();
      this._loaderService.show();
      this.group.updatedBy = "user";
      this.masterobj.ledgerUpdate(this.ledger)
        .subscribe((data: ApiResponse) => {
          if (data.status) {
            this.messageobj.add({ severity: 'success', summary: 'Success!', detail: data.message });
            this.ledger = new Ledger();
            this.type = "ledger";
            this.ledgerList();
          } else {
            this.messageobj.add({ severity: 'error', summary: 'Failure!', detail: data.message });
          }
          this._loaderService.hide();
        }, (error: any) => {
          console.log(error);
        });
    }
  }
  ledgerDelete(id) {
    this.ledger.ledgerId = id;
    this.ledger.updatedBy = "user";
    this._confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this._loaderService.show();
        this.masterobj.ledgerDelete(this.ledger)
          .subscribe((data: ApiResponse) => {
            if (data.status) {
              this.messageobj.add({ severity: 'success', summary: 'Success!', detail: data.message });
              this.ledger = new Ledger();
              this.ledgerList();
            } else {
              this.messageobj.add({ severity: 'error', summary: 'Failure!', detail: data.message });
            }
            this._loaderService.hide();
          }, (error: any) => {
            console.log(error);
          });
      }
    });
  }
  bindLedgerData(id) {
    this.ledger.ledgerId = id;
    this._loaderService.show();
    this.masterobj.ledgerList(this.ledger)
      .subscribe((data: ApiResponse) => {
        if (data.status) {
          this.ledger = data.data[0];
        } else {
          this.messageobj.add({ severity: 'error', summary: 'Failure!', detail: data.message });
        }
        this._loaderService.hide();
      }, (error: any) => {
        console.log(error);
      });
  }
  ledgerList() {
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


  itemSave(form: NgForm) {
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
      message: 'Are you sure that you want to save the Item?',
      accept: () => {
        this.itemSaveProceed();
      }
    });

  }

  itemSaveProceed() {
    if (this.item.itemId == 0) {
      this.item.createdBy = "user";
      this._loaderService.show();
      this.masterobj.itemInsert(this.item)
        .subscribe((data: ApiResponse) => {
          if (data.status) {
            this.messageobj.add({ severity: 'success', summary: 'Success!', detail: data.message });
            this.item = new Item();
            this.itemlist();
          } else {
            this.messageobj.add({ severity: 'error', summary: 'Failure!', detail: data.message });
          }
          this._loaderService.hide();
        }, (error: any) => {
          console.log(error);
        });
    } else {
      this.item.updatedBy = "user";
      this._loaderService.show();
      this.masterobj.itemUpdate(this.item)
        .subscribe((data: ApiResponse) => {
          if (data.status) {
            this.messageobj.add({ severity: 'success', summary: 'Success!', detail: data.message });
            this.item = new Item();
            this.itemlist();
          } else {
            this.messageobj.add({ severity: 'error', summary: 'Failure!', detail: data.message });
          }
          this._loaderService.hide();
        }, (error: any) => {
          console.log(error);
        });
    }
  }
  itemDelete(id) {
    this.item.itemId = id;
    this.item.updatedBy = "user";
    this._confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this._loaderService.show();
        this.masterobj.itemDelete(this.item)
          .subscribe((data: ApiResponse) => {
            if (data.status) {
              this.messageobj.add({ severity: 'success', summary: 'Success!', detail: data.message });
              this.item = new Item();
              this.itemlist();
            } else {
              this.messageobj.add({ severity: 'error', summary: 'Failure!', detail: data.message });
            }
            this._loaderService.hide();
          }, (error: any) => {
            console.log(error);
          });
      }
    });
  }
  itemlist() {
    this.group = new Group();
    this.groupList();
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

  binditemData(id) {
    this.item = new Item();
    this.item.itemId = id;
    this._loaderService.show();
    this.masterobj.itemList(this.item)
      .subscribe((data: ApiResponse) => {
        if (data.status) {
          this.item = data.data.filter(function (v) {
            return v.itemId == id;
          })[0];
        } else {
          this.messageobj.add({ severity: 'error', summary: 'Failure!', detail: data.message });
        }
        this._loaderService.hide();
      }, (error: any) => {
        console.log(error);
      });
  }


  proceed() {
    if (this.type == '') {
      this.messageobj.add({ severity: 'warn', summary: 'Failure!', detail: "Kindly select an option to proceed" });
      return;
    }
    this.showTable = true;
    this.mainpage = false;

    if (this.type == 'group') {
      this._router.navigate(['/master'], { queryParams: { type: "group" } });
    }
    else if (this.type == 'ledger') {
      this._router.navigate(['/master'], { queryParams: { type: "ledger" } });
    }
    else if (this.type == 'item') {
      this._router.navigate(['/master'], { queryParams: { type: "item" } });
    }

  }

  cancel() {
    this.group = new Group();
    this.item = new Item();

  }



}
