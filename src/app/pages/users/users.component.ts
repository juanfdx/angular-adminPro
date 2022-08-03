import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { SearchsService } from 'src/app/services/searchs.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users   : User[] = [];
  public total   : number = 0;
  public from    : number = 0;
  public loading : boolean = true;

  private subscription$!: Subscription;

  constructor(private userService: UserService,
              private searchService: SearchsService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  //GET USERS
  getUsers(): void {
    // this.loading = true
    this.userService.getAllUsers(this.from).subscribe({
      next: res => {
        this.users = res.users
        this.total = res.total
        this.loading = false      
      },
      error: err => Swal.fire('Error!!!', 'Error inesperado!', 'error')   
    })
  }

  tableUpdatePagination(from: number): void {
    this.from = from  
    this.getUsers()
  }

  tableUpdateDelete(): void {
    this.getUsers()
  }

  search(term: string): void {
    if (term.length === 0) {
      this.getUsers();
      return;
    }
    this.searchService.search('users', term, 0).subscribe( res => {
      this.users = res.data
      this.total = res.total
      
    })
    
  }

  searchUpdate(): void {

  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
