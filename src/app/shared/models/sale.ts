

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
    public  saleItemName : number = 0;
    public  batch : string = '';
    public  qty : number;
    public  mrp : number;
    public  gst : number;
    public  discount : number;
    public  total : number;
}
