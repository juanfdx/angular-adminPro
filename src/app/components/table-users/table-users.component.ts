import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss']
})
export class TableUsersComponent implements OnInit {

  public users : User[] = []
  public total : number = 0
  public from  : number = 0

  @Input() showTable : boolean = false
  @Output() loading = new EventEmitter<boolean>(false)


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(): void {
    this.userService.getAllUsers(this.from).subscribe({
      next: res => {
        this.users = res.users
        this.total = res.total
        this.loading.next(false)
      },
      error: err => Swal.fire('Error!!!', 'Unexpected error!', 'error')   
    })
  }

  pagination( value: number): void {
    this.from += value;

    if (this.from <  0) { this.from = 0 } 

    if (this.from >= this.total) { this.from -= value }

    this.getUsers();
  }

}
