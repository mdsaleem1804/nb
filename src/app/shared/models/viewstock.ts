export class ViewStock {
    public retailerId: number;
    public operatorId: number;
}

export class StockDetails {
    public gameBatchId: number;
    public gameName: string;
    public coverImageUrl: string;
    public ticketPrice: number;
    public totalStock: number;
}

export class RetailerStock {
    public retailerId: number;
    public retailerName: string;
    public retailerEmail: string;
    public retailerPhone: number;
    public availableStock: number;
}