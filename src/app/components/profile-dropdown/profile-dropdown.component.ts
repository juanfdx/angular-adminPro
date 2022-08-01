import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss']
})
export class ProfileDropdownComponent implements OnInit {

  @Input() dropProfile : boolean = false
  public user : any

  public listObservers$: Subscription[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const observer1$ = this.userService.user$.subscribe( (res: User) => {
      this.user = res   
     })
    this.listObservers$.push(observer1$)  
  }

  
  logout(): void {
    this.userService.logout()
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }

}
