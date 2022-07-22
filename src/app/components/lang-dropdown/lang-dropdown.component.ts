import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-lang-dropdown',
  templateUrl: './lang-dropdown.component.html',
  styleUrls: ['./lang-dropdown.component.scss']
})
export class LangDropdownComponent implements OnInit {

  @Input() dropLang : boolean = false


  constructor() { }

  ngOnInit(): void {
  }


}
