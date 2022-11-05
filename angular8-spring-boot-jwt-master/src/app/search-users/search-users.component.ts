import { Component, OnInit } from '@angular/core';
import {User} from '../shared/User';
import{HttpUserService} from '../service/http-user.service';
import {AuthenticationService} from '../service/authentication.service';
import Swal from 'sweetalert2';
import { userInfo } from 'os';
@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit {
  public searchContact: string;
  users:User[];
  favorites:User[];
  userLoggedIn:User;
  showFirst=false;
  constructor(private  httpUserService:HttpUserService,
    private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.httpUserService.getMyFavorites()
      .subscribe(res=>{
        this.favorites=res['favoritesSet'];
      //  console.log(this.favorites)
      });
      this.httpUserService.getMyDetails()
      .subscribe(res=>{
        this.userLoggedIn=res;
      })
  }

  searchUser(userinfo:string){
    if(userinfo.indexOf(" ")==-1){
      this.users=[];
    if(userinfo.length>0){
    this.httpUserService.searchUsers(userinfo)
    .subscribe(res=>{
      for(let r of res){
        let check=false;
        for(let fav of this.favorites){
          if(fav.username===r.username){
            r.toAdd=true;
            break;
          }
          else{
            r.toAdd=false;
          }
        }
        this.users.push(r)
      }
     // console.log(this.users);
    },err=>{
      console.log(err);
    });
  }
  else{
    this.users=[];
  }
    }

  }
  addToContact(user:User){
    let users:User[];
    users=[];
    users[0]=user;
    console.log(user.toAdd+"feq");
    if(!user.toAdd){
      //add to contacts list
    this.httpUserService.addTocontacts(users)
    .subscribe(res=>{
      console.log(res);
    },err=>{console.log(err);
    if(!err.match('200 - OK')){
      Swal.fire('Yikes!', 'Something went wrong :(', 'error')
    }});
  }
  else{
    this.httpUserService.removeContact(user)
    .subscribe(res=>{
      console.log(res);
    },err=>{console.log(err);
    if(!err.match('200 - OK')){
      Swal.fire('Yikes!', 'Something went wrong :(', 'error')
    }});
  }
}
}
