import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public active : boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  setActive(): void {
    this.active = !this.active
  }
}
