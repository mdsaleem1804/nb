import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
 Group, Item,Ledger

} from '../../models/master';
import { Observable } from 'rxjs';
import { SharedLib } from '../../shared.config';
import { PurchaseHeader } from '../../models/purchase';
import { SaleHeader } from '../../models/sale';
@Injectable({
  providedIn: 'root'
})
export class MasterService {

  //apiUrl: string = SharedLib.adminApiUrl;
  apiUrl: string = "http://52.23.204.147/GbamAdminAPI/api/";

  constructor(private _http: HttpClient) { }
  groupInsert(_data: Group) {
    return this._http.post('http://localhost:8088/api/Master/groupinsert', _data)
  }

  groupUpdate(_data: Group) {
    return this._http.post('http://localhost:8088/api/Master/groupupdate', _data)
  }

  groupList(_data: Group) {
    return this._http.post('http://localhost:8088/api/Master/grouplist', _data)
  }


 ledgerInsert(_data: Ledger) {
    return this._http.post('http://localhost:8088/api/Master/ledgerinsert', _data)
  }

  ledgerUpdate(_data: Ledger) {
    return this._http.post('http://localhost:8088/api/Master/ledgerupdate', _data)
  }

  ledgerDelete(_data: Ledger) {
    return this._http.post('http://localhost:8088/api/Master/ledgerdelete', _data)
  }
  ledgerList(_data: Ledger) {
    return this._http.post('http://localhost:8088/api/Master/ledgerlist', _data)
  }


  itemInsert(_data: Item) {
    return this._http.post('http://localhost:8088/api/Master/iteminsert', _data)
  }
  
  itemUpdate(_data: Item) {
    return this._http.post('http://localhost:8088/api/Master/itemupdate', _data)
  }
  itemDelete(_data: Item) {
    return this._http.post('http://localhost:8088/api/Master/itemdelete', _data)
  }
  itemList(_data: Item) {
    return this._http.post('http://localhost:8088/api/Master/itemlist', _data)
  }
  

  purchaseInsert(_data: PurchaseHeader) {
    //console.log(_data);
    return this._http.post('http://localhost:8088/api/Purchase/PurchaseEntry', _data)
  }
  saleInsert(_data: SaleHeader) {

    return this._http.post('http://localhost:8088/api/Purchase/PurchaseEntry', _data)
  }

}
