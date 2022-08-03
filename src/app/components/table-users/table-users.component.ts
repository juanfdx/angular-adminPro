import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { SearchsService } from 'src/app/services/searchs.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss']
})
export class TableUsersComponent implements OnInit {

  @Input() users   : User[] = []
  @Input() total   : number = 0
  @Input() loading : boolean = false
  @Output() updatePagination = new EventEmitter<number>()
  @Output() updateDelete     = new EventEmitter<boolean>()

  public from   : number = 0


  constructor(private userService: UserService,
              private searchService: SearchsService) { }

  ngOnInit(): void {
  }

  //CHANGE USER ROLE
  changeUserRole(user: User): void {
    this.userService.changeRoleOrStatus(user).subscribe(res => res)
  }

  //CHANGE USER STATUS
  changeUserStatus(user: User): void {
    (user.status === 'active') ? user.status = 'inactive' : user.status = 'active';   
    this.userService.changeRoleOrStatus(user).subscribe( res => res)
  }

  //DELETE USER
  deleteUser(user: User): void {
    
    if (user._id === this.userService.userId) {
      Swal.fire('Error!!!', 'No puede borrarse a si mismo.', 'error');
    
    } else {
      Swal.fire({
        title: 'Borrar',
        text: `Deseas borrar a ${ user.name } ${ user.lastName }?`,
        showCancelButton: true,
        confirmButtonText: 'Si',
        
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          this.userService.deleteUser(user._id).subscribe({
            next: res => {
              Swal.fire('Usuario borrado', `${ user.name } ${ user.lastName }`, 'success');
              this.updateDelete.emit(true)
            },
            error: err => Swal.fire('Error!!!', 'No se pudo borrar ese usuario.', 'error'),

          })
        }
      })
    }
  }



  //PAGINATION
  pagination( value: number): void {
    this.from += value;
    if (this.from <  0) { this.from = 0 } 
    if (this.from >= this.total) { this.from -= value }

    this.updatePagination.emit(this.from)
  }



}
