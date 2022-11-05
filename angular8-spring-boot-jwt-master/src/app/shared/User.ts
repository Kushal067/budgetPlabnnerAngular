import {Tour} from './Tour'
export class User {
 // public name: string;
 public id:string;
  public mobile: string;
  public username: string;
  public email:string;
  public password:string;
  public tours:Tour[];
  public profilePicture:{name:String,type:String, picByte:string}
  public name: string;
  public toAdd: boolean;
  public roles:string[];
  public initials:string;
 // public toAdd: boolean
  constructor(username:string,email:string,password:string,mobile:string,name:string,roles:string[]) {
 this.username=username;
 this.email=email;
 this.password=password;
 this.mobile=mobile;
 this.name=name;
 this.roles=roles;
  }
}
