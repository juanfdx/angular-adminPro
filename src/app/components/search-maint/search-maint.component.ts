import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchsService } from 'src/app/services/searchs.service';

@Component({
  selector: 'app-search-maint',
  templateUrl: './search-maint.component.html',
  styleUrls: ['./search-maint.component.scss']
})
export class SearchMaintComponent implements OnInit {

  @Input() page : string = 'user'
  @Output() term = new EventEmitter<string>()


  constructor(private searchService: SearchsService) { }

  ngOnInit(): void {
  }

  search(term: string): void {
    if (term.length === 0) {
      this.searchService.searchSource.next(false)
    
    } else {
      this.searchService.searchSource.next(true)
    }
    this.term.emit(term)
  }
}