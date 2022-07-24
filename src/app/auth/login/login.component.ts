import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public active : boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  setActive(): void {
    this.active = !this.active
  }
}
