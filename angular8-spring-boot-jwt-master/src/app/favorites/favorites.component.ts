import { Component, OnDestroy, OnInit } from '@angular/core';
import { IgxFilterOptions } from 'igniteui-angular';
import {User} from "../shared/User";
import { HttpUserService } from "../service/http-user.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-component',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit,OnDestroy {
  public searchContact: string;
  favorites: User[];
  deleteContactsFlag=false;
  contactToBeDeleted :User;
  public density = 'comfortable';
  public displayDensities;
  errMess: string;

  constructor(private httpUserService: HttpUserService) { }

  public ngOnInit() {
    this.httpUserService
    .getMyFavorites()
    .subscribe(response => {
      console.log(response);
      this.handleSuccessfulResponse(response)},  errmess => this.errMess = <any>errmess);
  }


  handleSuccessfulResponse(response) {
    for(let res of response.favoritesSet){
      res.toAdd=false;
      if(res.profilePicture.picByte==""||res.profilePicture.picByte==null){
        res.initials=res.name.charAt(0);
        let index= res.name.indexOf(" ");
        if(index!=-1&&res.name.charAt(index+1)!=""){
          res.initials+=res.name.charAt(index+1)
        }
      }
   }
   this.favorites = response.favoritesSet;
   console.log(this.favorites)
 }

  public selectDensity(event) {
    this.density = this.displayDensities[event.index].label;
  }

  public toggleFavorite(contact: any) {
    contact.toAdd = !contact.toAdd;
  }

  get filterContacts() {
    const fo = new IgxFilterOptions();
    fo.key = 'name';
    fo.inputValue = this.searchContact;
    return fo;
  }
  public deleteContactsToggle(){
    this.deleteContactsFlag=!this.deleteContactsFlag;
  }

  public deleteContacts(contact:User){

    //onsole.log(contact+'index:'+index);
    Swal.fire({
      title: 'Are you sure?',
      text: " you want to delete-> "+contact.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',

    }).then((result) => {
      if (result.isConfirmed) {
        this.httpUserService.removeContact(contact).subscribe(res=>
          console.log(res)),
          err=>console.log(err);
          let index = this.favorites.findIndex(x => x.id === contact.id);
          this.favorites.splice(index,1);
      }
    })

  }
  public ngOnDestroy(){
    this.favorites=[]
  }

}
