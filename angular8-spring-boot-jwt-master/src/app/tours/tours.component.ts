import { Component, OnInit } from '@angular/core';
import { HttpUserService } from "../service/http-user.service";
import { IgxFilterOptions } from 'igniteui-angular';
import {User} from '../shared/User';
import {Tour} from '../shared/Tour';
import { SortTourPipe } from '../pipes/sort-tour.pipe';
import Swal from 'sweetalert2';
import {HttpTourService} from '../service/http-tour.service'

interface TourOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})

export class ToursComponent implements OnInit {
  searchTour:string;
  myTours: Tour[];
  myToursCopy: Tour[];
  closetourDetailsFlag=false;
  sortToursBy:1;
  searchContact:string
  loading=true;
  tourStatus: TourOptions[] = [
    {value: '1', viewValue: 'All tours'},
    {value: '2', viewValue: 'Active tours'},
    {value: '3', viewValue: 'Recent tours'}
  ];

  constructor(private httpUserService:HttpUserService,
    private httpTourService:HttpTourService) { }

  ngOnInit() {

    this.httpUserService.getMyDetails()
    .subscribe(res=>{
      this.myTours=res.tours;
      this.myToursCopy=res.tours;
     // console.log('tours'+JSON.stringify(res.tours));
     this.loading=false;
    },err=>{
      this.loading=false;
    });

  }
  public closeTourDetail(tour:Tour){
    //tour.openTourDetail=!tour.openTourDetail;
   let index= this.myTours.indexOf(tour);
   tour.openTourDetail=false;
   this.myTours[index]=tour;
 //  console.log("close"+tour)
   this.closetourDetailsFlag=true;
  }

  get filterTours() {
    const fo = new IgxFilterOptions();
    fo.key = 'name';
    fo.inputValue = this.searchTour;
    return fo;
  }
  public openTourDetails(tour:Tour){
    for(let t of this.myTours){
      t.openTourDetail=false;
    }
    if(this.closetourDetailsFlag!=true){
      tour.openTourDetail=true;
      //console.log("open"+tour)
    }
    this.closetourDetailsFlag=false;
  }
  public endTour(tour){
    Swal.fire({
      title: 'Are you sure?',
      text: "you wanna end tour? This can't be undone once done",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',

    }).then((result) => {
      if (result.isConfirmed) {
    this.httpTourService.endTour(tour.id)
    .subscribe(res=>{
      console.log(res);
    this.ngOnInit();

    })
  }
  });
}

  public filterTour(sort){
  if(sort==1){
    this.myToursCopy=this.myTours;
  }
  if(sort==2){
    console.log('check'+sort);
    this.myToursCopy=[];
        for(let tour of this.myTours){
          if(tour.active)
          this.myToursCopy.push(tour);
        }

      }
    if(sort==3){
      console.log('check'+sort);
      this.myToursCopy=[];
        for(let tour of this.myTours){
          if(!(tour.active))
          this.myToursCopy.push(tour);
        }
      }
    }
}
