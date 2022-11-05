import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { first } from 'rxjs/operators';
import { IgxFilterOptions } from 'igniteui-angular';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpUserService} from '../service/http-user.service';
import {HttpTourService} from '../service/http-tour.service'
import {User} from '../shared/User';
import {userID} from '../shared/userIdList'
import{Tour} from  '../shared/Tour'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-new-tour',
  templateUrl: './create-new-tour.component.html',
  styleUrls: ['./create-new-tour.component.scss']
})
export class CreateNewTourComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  fieldTextType:boolean
  hide=true;
  favorites: User[];
  selectedUsers:User[];
  errMess:string;
  userIds:userID[];
  myDetails:User;
  public searchContact: string;
  participants:String;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpUserService:HttpUserService,
    private httpTourService:HttpTourService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(20)])],
      description:['',Validators.compose([Validators.minLength(3),Validators.maxLength(25)])]
  });
  this.httpUserService
  .getMyFavorites()
  .subscribe(response => {
    console.log(response);
    this.handleSuccessfulResponse(response)},  errmess => this.errMess = <any>errmess);

    this.httpUserService.getMyDetails()
    .subscribe(resp=>{
      this.myDetails=resp;
    })
  }
  handleSuccessfulResponse(response) {
    for(let res of response.favoritesSet){
      res.toAdd=false;
   }
   this.favorites = response.favoritesSet;
 }
  get f() { return this.form.controls; }

  onSubmit(){
    this.submitted = true;
    this.participants='';
    this.userIds=[];
    if (this.form.invalid) {
      return;
    }

    for(let user of this.favorites){
      console.log('favorites:'+this.favorites);
      console.log("id:"+user.id)
      if(user.toAdd){
        this.userIds.push({id:user.id,name:user.name});
        this.participants+=user.name+',\n';
      }
    }
    this.userIds.push({id:this.myDetails.id,name:this.myDetails.name})
    this.participants+=this.myDetails.name;
    let tour={
       name:this.form.value.name,
       description:this.form.value.description,
       participants:this.userIds,
       active:true
      };
    console.log(this.form.value)
    console.log('selected user:'+this.userIds)
    if(this.userIds.length<2){
      Swal.fire('Yikes!', 'Add atleast one participant from contacts', 'error')
    }
    else{
      Swal.fire({
        title: 'Are you sure?',
        text: "Participants :"+this.participants,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',

      }).then((result) => {
        if (result.isConfirmed) {
          this.httpTourService.createTour(tour)
        .pipe(first())
        .subscribe({
        next: () => {
            //this.alertService.success('Registration successful', { keepAfterRouteChange: true });
            Swal.fire('Yeahh!', 'Tour created succesfully', 'success')
            this.router.navigate(['../']);
        },
        error: error => {
          //  this.alertService.error(error);
          Swal.fire('Yikes!', JSON.stringify(error.error.message), 'error')
            this.loading = false;
          }
         });
        }
      })
    }
   }

   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  get filterContacts() {
    const fo = new IgxFilterOptions();
    fo.key = 'name';
    fo.inputValue = this.searchContact;
    return fo;
  }
  public toggleFavorite(contact: any) {
    contact.toAdd = !contact.toAdd;
  }
}
