import { Component, OnInit } from "@angular/core";
import { HttpUserService } from "../service/http-user.service";
import{User} from "../shared/User"

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit {
  employees: User[];
  displayedColumns: string[] = ["name", "designation", "delete","toAdd"];

  constructor(private httpUserService: HttpUserService) {}

  ngOnInit() {
    this.httpUserService
      .getMyFavorites()
      .subscribe(response => {
        // for(let res of response){
        //   res.toAdd=false;
        // }
        console.log(response);
        this.handleSuccessfulResponse(response)});
  }

  handleSuccessfulResponse(response) {
     for(let res of response.favoritesSet){
       res.toAdd=false;
    }
    this.employees = response.favoritesSet;
  }

  deleteEmployee(employee: User): void {
    this.httpUserService.deleteEmployee(employee).subscribe(data => {
      this.employees = this.employees.filter(u => u !== employee);
    });
  }
  public toggleFavorite(contact: any) {
    contact.toAdd = !contact.toAdd;
    console.log(contact);
  }
  public print(){
    console.log(this.employees);
  }
}
