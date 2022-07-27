import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public active : boolean = false

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  setActive(): void {
    this.active = !this.active
  }

  login(): void {
    this.router.navigateByUrl('/')
  }
}
