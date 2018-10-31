import { Injectable } from '@angular/core';
import { SharedLib } from '../../shared.config';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { SalesReport } from '../../models/salesreport';
import { PurchaseReport } from '../../models/PurchaseReport';

@Injectable({
  providedIn: 'root'
})
export class SalesreportService {
  apiUrl: string = SharedLib.retailerApiUrl;

  constructor(private _http: HttpClient) { }

  SalesReport(_report: SalesReport) {
    return this._http.post('http://localhost:8088/api/Master/report_sales', _report)
  }
  PurchaseView(data) {
    return this._http.post('http://localhost:8088/api/Purchase/PurchaseView', data)
  }
  SaleView(data) {
    return this._http.post('http://localhost:8088/api/Sale/SaleView', data)
  }

  PurchaseViewDetails(data) {
    return this._http.post('http://localhost:8088/api/Purchase/PurchaseViewDetails', data)
  }
}
