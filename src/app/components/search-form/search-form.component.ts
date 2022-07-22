import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  @Input() searchForm   : boolean = false
  @Output() closeSearch = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  hideSearchForm(): void {
    this.closeSearch.emit(false)
  }
}
