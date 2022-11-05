import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Tour}from "../shared/Tour"
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import {userID} from '../shared/userIdList';
import {baseURL} from '../shared/baseUrl'

@Injectable({
  providedIn: 'root'
})
export class HttpTourService {

  constructor(private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
    baseURL=baseURL;

    public getMyTours() :Observable<Tour[]>{
      return this.httpClient.get<Tour[]>(this.baseURL+"api/v1/user/myFavorites")
    .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    public getTourById(id:string):Observable<Tour>{
      return this.httpClient.get<Tour>(this.baseURL+"api/v1/tour/"+id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }
    public createTour(tour):Observable<object>{
      return this.httpClient.post<object>(this.baseURL+"api/v1/tour/",tour)
    .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    public addBill(id,bill):Observable<object>{
      return this.httpClient.post<object>(this.baseURL+"api/v1/tour/"+id+"/addBill",bill)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    public endTour(id):Observable<object>{
      return this.httpClient.post<object>(this.baseURL+"api/v1/tour/"+id+"/endTour","")
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

}
