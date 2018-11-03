

export class SaleHeader {
    public  saleHeaderId  : number = 0;
    public  saleLedgerId : number;
    public saleDetails: SaleDetails[];
    public createdBy: string = '';
    public updatedBy: string = '';
    public billDate:Date;
}

export class SaleDetails {
    public  saleItemId : number = 0;
    public  stockId : number = 0;
    public barCode:number=0;
    public  saleItemName : number = 0;
    public  batch : string = '';
    public  qty : number;
    public  mrp : number;
    public  gst : number;
    public  discount : number;
    public  total : number;
    public  stockCurrent : number;
}
export class StockSelection {

   public  stockId : number;
   
    public  stockItemId : number;
    public  stockPurchaseHeaderId : number;
    public  stockEntered : number;
    public  stockCurrent : number;
    public  batch : string;
    public  gst : number;
    public  discount : number;
}
