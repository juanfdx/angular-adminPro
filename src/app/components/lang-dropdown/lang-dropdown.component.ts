import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToggleMenuService } from 'src/app/services/toggle-menu.service';


@Component({
  selector: 'app-lang-dropdown',
  templateUrl: './lang-dropdown.component.html',
  styleUrls: ['./lang-dropdown.component.scss']
})
export class LangDropdownComponent implements OnInit {

  @Input() dropLang : boolean = false
  @Output() close = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit(): void {
  }

  clickClose(): void {
    this.dropLang = false
    this.close.emit(false)
  }

}
