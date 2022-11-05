import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isMenuOpen: boolean = false;
  constructor(public loginService:AuthenticationService){ }
  ngOnInit() {

  }

  public onSidenavClick(): void {
    this.isMenuOpen = false;
  }
}
