import {User} from "./User";
import {Balance} from './balance';
import {Expenditure} from './expenditure'
export class Tour{
  public id:string;
    public name:string;
    public description:string;
    public active :boolean;
    public participants:User[];
    public date :Date;
    public createdBy:User;
    public balance:Balance[];
    public expenditure: Expenditure[];
    openTourDetail=false;
  constructor(name:string, active:boolean,participants:User[],description: string){
    this.name=name;
    this.description=description;
    this.active=active;
    this.participants=participants;
  }
  }
