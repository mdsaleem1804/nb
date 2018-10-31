import { Injectable } from '@angular/core';
import { SharedLib } from '../../shared.config';
import { HttpClient } from '@angular/common/http';
import { ViewStock } from '../../models/viewstock';

@Injectable({
  providedIn: 'root'
})
export class ViewStockService {
  apiUrl: string = SharedLib.adminApiUrl;
  retApi: string = SharedLib.retailerApiUrl;

  constructor(private _http: HttpClient) { }

  getAvailableGameBatches(data) {
    return this._http.post(this.apiUrl + 'admin/master/GameBatchForRetailer', data)
  }

  viewAdminStock(_viewStock: ViewStock) {
    return this._http.post(this.apiUrl + 'admin/viewStock/getadminStock', _viewStock)
  }

  viewRetailerStock(_viewStock: ViewStock) {
    return this._http.post(this.apiUrl + 'admin/viewStock/getRetailerStock', _viewStock)
  }

  viewDispatchedStock(_viewStock: ViewStock) {
    return this._http.post(this.retApi + 'retailer/viewStock/dispatchedstock', _viewStock)
  }

  viewadminStockInRetailerWarehouseRequest(_viewStock: ViewStock) {
    return this._http.post(this.apiUrl + 'admin/viewStock/getAdminStockinRetailerWarehouseRequest', _viewStock)
  }

  viewadminStockInRetailerWarehouse(_viewStock: ViewStock) {
    return this._http.post(this.apiUrl + 'admin/viewStock/getAdminStockinRetailerWarehouse', _viewStock)
  }

  cashSettlement(data) {
    return this._http.post(this.retApi + 'retailer/retailer/cashsettlement', data)
  }

  stockHistory(data) {
    return this._http.post(this.retApi + 'retailer/ticket/stockHistory', data)
  }

  cardHistory(data) {
    return this._http.post(this.retApi + 'retailer/viewstock/getCardListByTrackerId', data)
  }

  getAdminMasterCardDrill(data) {
    return this._http.post(this.apiUrl + 'admin/viewstock/getAdminMasterCardDrill', data)
  }

  getAdminMasterCardSummary() {
    return this._http.get(this.apiUrl + 'admin/viewStock/getAdminMasterCardSummary')
  }

}
