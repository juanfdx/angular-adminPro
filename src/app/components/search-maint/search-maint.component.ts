import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-maint',
  templateUrl: './search-maint.component.html',
  styleUrls: ['./search-maint.component.scss']
})
export class SearchMaintComponent implements OnInit {

  @Input() page : string = 'user'

  constructor() { }

  ngOnInit(): void {
  }

}
