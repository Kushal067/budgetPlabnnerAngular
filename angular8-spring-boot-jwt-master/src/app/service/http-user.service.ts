import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {User}from "../shared/User"
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import {baseURL} from '../shared/baseUrl'
@Injectable({
  providedIn: "root"
})
export class HttpUserService {
  constructor(private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) {}
    baseURL=baseURL;

  getMyFavorites(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseURL+"api/v1/user/myFavorites")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public deleteEmployee(employee) {
    return this.httpClient.delete<User>(
      "http://localhost:8080/employees" + "/" + employee.empId
    );
  }

  public createEmployee(employee) {
    return this.httpClient.post<User>(
      "http://localhost:8080/employees",
      employee
    );
  }

  public signUpUser(user:User) {
    user.roles=['user'];
    return this.httpClient.post<User>(
      this.baseURL+"api/v1/auth/signup",
     user
    );
  }

  public getMyDetails():Observable<User>{
    return this.httpClient.get<User>(this.baseURL+'api/v1/user/getMyDetails')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public updateProfilePicture(image:FormData){
    return this.httpClient.post<FormData>(
      this.baseURL+'api/v1/user/uploadProfilePicture',image)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
//get method to find users/contacts like(username, name)
  public searchUsers(userInfo:string){
    console.log('test')
    return this.httpClient.get<User[]>(this.baseURL+'api/v1/user/findUsers?userInfo='+userInfo)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public addTocontacts(users:User[]){
    return this.httpClient.post<User[]>(this.baseURL+'api/v1/user/addToMyFavorites',users)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  public removeContact(user:User){
    return this.httpClient.post<User>(this.baseURL+'api/v1/user/removeFromMyFavorites',user)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public getUserById(id){
    return this.httpClient.get<User>(this.baseURL+'api/v1/user/getUserById/'+id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
