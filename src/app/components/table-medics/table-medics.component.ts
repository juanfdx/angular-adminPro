import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MedicService } from 'src/app/services/medic.service';
import { SearchsService } from 'src/app/services/searchs.service';
import { Medic } from 'src/app/interfaces/medic.interface';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table-medics',
  templateUrl: './table-medics.component.html',
  styleUrls: ['./table-medics.component.scss']
})
export class TableMedicsComponent implements OnInit {

  
  @Input() loading : boolean = false
  @Output() loaded = new EventEmitter<boolean>()

  public medics : Medic[] = []
  public total  : number = 0
  public from   : number = 0
  public term   : string = ''

  private subscription$!: Subscription


  constructor(private medicService: MedicService,
              private searchService: SearchsService) { }


  ngOnInit(): void {
    this.getMedics()

    this.subscription$ = this.searchService.search$.subscribe( res => {
      this.term = res
      this.search(this.term) 
    })
  }

  getMedics(): void {
    this.loaded.emit(true) 
    this.medicService.getAllMedics().subscribe({
      next: res => {
        this.medics = res.medics
        this.total = res.total
        this.loaded.emit(false)
      },
      error: err => Swal.fire('Error!!!', 'Error inesperado!', 'error') 
    })
  }

  //SEARCH
  search(term: string): void {
    if (term.length === 0) {
      this.getMedics();
      return;
    }
    this.searchService.search('medics', term).subscribe( res => {
      this.medics = res.data
      this.total  = res.total   
    })
  }

  saveMedic(): void {

  }

  deleteMedic(): void {

  }

  //OPEN MODAL
  openModal(): void {

  }
  
  //PAGINATION
  pagination( value: number): void {
    this.from += value;
    if (this.from <  0) { this.from = 0 } 
    if (this.from >= this.total) { this.from -= value }
    this.getMedics()
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
