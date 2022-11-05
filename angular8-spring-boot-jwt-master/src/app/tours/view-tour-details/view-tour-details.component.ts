import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import {Tour} from '../../shared/Tour';
import {User} from '../../shared/User';
import {HttpTourService} from '../../service/http-tour.service';
import {HttpUserService} from '../../service/http-user.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-view-tour-details',
  templateUrl: './view-tour-details.component.html',
  styleUrls: ['./view-tour-details.component.scss']
})
export class ViewTourDetailsComponent implements OnInit {

  id:string;
  tour:Tour;
  panelOpenState='closed';
  profilePictue:string;
  participants: User[];
  loading=true
  constructor(private route: ActivatedRoute,
    private httpTourService:HttpTourService,
    private httpUserService:HttpUserService) { }

  ngOnInit() {
    this.participants=[];
    this.route.params.subscribe(
      (params:Params)=>{
        this.id= params['id'];
        console.log(this.id);
      });
     this.httpTourService.getTourById(this.id)
     .subscribe(res=>{
      this.tour=res;
      console.log(this.tour);
      this.loading=false;
      for(let user of this.tour.participants){
        this.httpUserService.getUserById(user.id)
        .subscribe(res=>{
          user.profilePicture=res.profilePicture;
          this.participants.push(user);
        })
      }
     },err=>{
       this.loading=false;
     }) ;
     console.log(this.participants)
  }
}
