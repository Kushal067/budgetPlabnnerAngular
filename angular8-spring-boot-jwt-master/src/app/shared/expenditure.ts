import {User} from'./User';
export class Expenditure{
  id:string;
  spentBy:User;
  splitBillOn:User[];
  amountSpent:number;
  billNote:string;
  billDate:Date;
}
