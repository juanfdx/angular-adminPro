import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public menu : boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  setActiveMenu(): void {

  }

}
