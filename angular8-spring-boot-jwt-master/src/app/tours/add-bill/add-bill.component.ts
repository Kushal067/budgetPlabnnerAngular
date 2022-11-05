import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import {Tour} from '../../shared/Tour';
import {User} from '../../shared/User';
import { userID } from '../../shared/userIdList'
import {HttpTourService} from '../../service/http-tour.service';
import Swal from 'sweetalert2';
import { first } from 'rxjs/operators';
import { IgxFilterOptions } from 'igniteui-angular';
@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.scss']
})
export class AddBillComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private httpTourService:HttpTourService,
    private formBuilder: FormBuilder) { }
  id:string;
  tour:Tour;
  form: FormGroup;
  loading = false;
  submitted = false;
  fieldTextType:boolean
  hide=true;
  errMess:string;
  participants:User[];
  userIds:userID[];
  splitBillOn:string;
  public searchContact: string;
  select:boolean;

  ngOnInit() {
    this.form = this.formBuilder.group({
      bill_note: ['',Validators.compose([Validators.minLength(3),Validators.maxLength(20)])],
     amount_Spent:['',Validators.compose([Validators.required,Validators.pattern(/^[0-9]+(.[0-9]{0,2})?$/)])]

  });
    this.route.params.subscribe(
      (params:Params)=>{
        this.id= params['id'];
        console.log(this.id);
      });
     this.httpTourService.getTourById(this.id)
     .subscribe(res=>{
      this.tour=res;
      console.log(this.tour)
      this.participants=res.participants;
     }) ;
  }
  onSubmit(){
    this.submitted = true;
    this.splitBillOn='';
    this.userIds=[];
    if (this.form.invalid) {
      return;
    }

    for(let user of this.participants){
      console.log('participants:'+this.participants);
      console.log("id:"+user.id)
      if(user.toAdd){
        this.userIds.push({id:user.id,name:user.name});
        this.splitBillOn+=user.name+',';
      }
    }

    let bill={
      billNote:this.form.value.bill_note,
      amountSpent:this.form.value.amount_Spent,
      splitBillOn:this.userIds,
      };

    console.log(this.form.value)
    console.log('selected user:'+this.userIds)
    if(this.userIds.length<1){
      Swal.fire('Yikes!', 'Add atleast one participant from contacts', 'error')
    }
    else{
      Swal.fire({
        title: 'Are you sure?',
        text: "spend "+this.form.value.amount_Spent+" on "+this.splitBillOn,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',

      }).then((result) => {
        if (result.isConfirmed) {
          this.httpTourService.addBill(this.id,bill)
        .pipe(first())
        .subscribe({
        next: () => {
            //this.alertService.success('Registration successful', { keepAfterRouteChange: true });
            Swal.fire('', 'Bill succesfully added', 'success');
            window.location.reload();
        },
        error: error => {
          //  this.alertService.error(error);
          if(error.match('200 - OK'))
            {
              Swal.fire('', 'Bill succesfully added', 'success')
              window.location.reload();
            }
            else{
            Swal.fire('Yikes!', 'something went wrong try again', 'error')
            this.loading = false;
            }
          }
         });
        }
      })
    }
   }

  get f() { return this.form.controls; }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  selectAll(){
    this.select=!this.select;
    for(let user of this.participants){
      user.toAdd=this.select;
    }
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
