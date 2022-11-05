import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { first } from 'rxjs/operators';
import {HttpUserService} from '../service/http-user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  fieldTextType: boolean;
  hide=true
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpUserService:HttpUserService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      mobile:['',[Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
      email:['',[Validators.required,Validators.email]],
      username: ['',[ Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(20)]]
  });
  }
   get f() { return this.form.controls; }

   onSubmit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.httpUserService.signUpUser(this.form.value)
    .pipe(first())
    .subscribe({
        next: () => {
            //this.alertService.success('Registration successful', { keepAfterRouteChange: true });
            Swal.fire('congrats!', 'signup successfull', 'success')
            this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: error => {
          //  this.alertService.error(error);

          Swal.fire('Yikes!', JSON.stringify(error.error.message), 'error')
            this.loading = false;
        }
    });
   }
   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
