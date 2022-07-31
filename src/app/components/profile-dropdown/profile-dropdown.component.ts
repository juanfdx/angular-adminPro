import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss']
})
export class ProfileDropdownComponent implements OnInit {

  @Input() dropProfile : boolean = false

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  
  logout(): void {
    this.userService.logout()
  }

}
