

export class PurchaseHeader {
    public  purchaseHeaderId  : number = 0;
    public  purchaseLedgerId : number;
    public purchaseDetails: PurchaseDetails[];
    public createdBy: string = '';
    public updatedBy: string = '';
    public billDate:Date;
}

export class PurchaseDetails {
    public  purchaseItemId : number = 0;
    public  purchaseItemName : number = 0;
    public  batch : string = '';
    public  qty : number;
    public  price : number;
    public  mrp : number;
    public  gst : number;
    public  discount : number;
    public  total : number;
}
