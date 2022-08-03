import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users      : User[] = [];
  public totalUsers : number = 0;
  public from       : number = 0;
  public loading    : boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  setLoading(event: boolean): void {
    this.loading = event
  }



}
