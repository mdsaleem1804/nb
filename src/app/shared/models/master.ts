export class Group {
    public groupId: number = 0;
    public groupName: string;
    public createdBy: string;
    public updatedBy: string
}
export class Item {
    public itemId: number = 0;
    public itemGroupId: number = 1; 
    public itemName: string;
    public createdBy: string;
    public updatedBy: string
}
export class Ledger {
    public  ledgerId : number = 0;
    public  ledgerName: string;
    public  ledgerType : number = 0;
    public  ledgerMobileno: string;
    public  ledgerAddress : string;
    public  ledgerGstno : string;
    public createdBy: string;
    public updatedBy: string
}

export class Test {
    public  testid : string;
    public  testname: string;
   }
