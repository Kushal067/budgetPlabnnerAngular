import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import {User} from '../shared/User';
import {baseURL} from '../shared/baseUrl'


@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}
// Provide username and password for authentication, and once authentication is successful,
//store JWT token in session
baseURL=baseURL;
  authenticate(username, password) {
    return this.httpClient
      .post<any>(baseURL+"api/v1/auth/signin", { username, password })
      .pipe(
        map(userData => {

          sessionStorage.setItem("username", username);
          sessionStorage.setItem("roles",userData.roles)
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          sessionStorage.setItem("profilePicture",userData.profilePicture.picByte);
          return userData;
        })
      );
  }

  public isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    console.log(!(user === null));
    return !(user === null);
  }
  public isSessionExpired(){
    const expiry = (JSON.parse(atob(sessionStorage.getItem("token").split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  public getUserDetails(){
    let user :User;
   // user.profilePicture.picByte=sessionStorage.getItem("profilePicture");
    user.username=sessionStorage.getItem("username");
    for(let role of sessionStorage.getItem("roles")){
      user.roles.push(role);
    }

    // user.username=sessionStorage.getItem("username");
    // user.roles=sessionStorage.getItem("roles");
    // user.profilePicture=sessionStorage.getItem("profilePicture");
    return user;
  }
  getUserProfilepicture(){
    return sessionStorage.getItem("profilePicture")
  }

  logOut() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("roles");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("profilePicture");
  }
}
