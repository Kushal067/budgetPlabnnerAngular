import { Component, OnInit } from '@angular/core';
import{HttpUserService} from '../service/http-user.service';
import{User} from '../shared/User';
@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.scss']
})
export class MyDetailsComponent implements OnInit {
  mydetails:User;
  editProfilePic=false;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  loading=true;
  ref = ['jpg','jpeg','png'];
  constructor(private httpUserService:HttpUserService) { }

  ngOnInit() {
    this.httpUserService
      .getMyDetails()
      .subscribe(response => {
        console.log(response);
        this.handleSuccessfulResponse(response)
        this.loading=false;
      },err=>{
        this.loading=false;

      });
  }

  handleSuccessfulResponse(response) {
   this.mydetails = response;
 }
 editProfilePicture(){
  this.editProfilePic=!this.editProfilePic;
 }
 public onFileChanged(event) {
      //Select File
      this.selectedFile = event.target.files[0];
      let  name :any= this.selectedFile.name.toLowerCase(); //| lowercase;
      length = name.length;
     let ext = name.lastIndexOf(".")+1;
     let ext1 = name.substring(ext,length);
     if(!this.validateFileFormat(ext1)){
       this.message='invalid please select jpg,jpeg,png format only';
       setTimeout (() => {
        this.message=null;
     }, 3000);
     }
     else if(this.selectedFile.size>60000){
      this.message='file size exceeded 60kb try smaller file';
      setTimeout (() => {
       this.message=null;
    }, 3000);
     }

 }
    //Gets called when the user clicks on submit to upload the image
    onUpload() {
      console.log(this.selectedFile);
      //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
      const uploadImageData = new FormData();
      uploadImageData.append('profilePicture', this.selectedFile, this.selectedFile.name);
    let  name :any= this.selectedFile.name.toLowerCase(); //| lowercase;
            length = name.length;
           let ext = name.lastIndexOf(".")+1;
           let ext1 = name.substring(ext,length);
      //Make a call to the Spring Boot Application to save the image
      if(this.validateFileFormat(ext1) && !(this.selectedFile.size>60000)){
        this.httpUserService.updateProfilePicture(uploadImageData)
        .subscribe((response) => {
      console.log('response'+response)
        },errmess => {this.message =  errmess;
          if(this.message.match('200 - OK')){
            this.message='profile picture updated succesfully :)';
            window.location.reload();
            setTimeout (() => {
              this.editProfilePic=false;
              this.message=null;
           }, 4000);
          }
          else{
            this.message='Yikes! something went wrong :( try again';
            setTimeout (() => {
              this.editProfilePic=false;
              this.message=null;
           }, 5000);

          }
        }
        );
      }
      else{
        if((this.selectedFile.size>60000)){
          this.message='file size exceeded 60kb try smaller file'
        }
        else
        this.message="inavlid file format error. Only .jpg,.jpeg,.png formats are allowed";
        setTimeout (() => {
          this.editProfilePic=false;
          this.message=null;
       }, 6000);
      }

    }

    validateFileFormat(ext1){
      for (let k=0 ; k <= 4;k++){
        if(this.ref[k]==ext1){
            return true;
        }
    }
    return false;
    }
}
