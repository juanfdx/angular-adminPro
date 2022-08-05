import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital.service';
import { SearchsService } from 'src/app/services/searchs.service';
import { Hospital } from 'src/app/interfaces/hospital.interface';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-hospitals',
  templateUrl: './table-hospitals.component.html',
  styleUrls: ['./table-hospitals.component.scss']
})
export class TableHospitalsComponent implements OnInit {

  @Input() loading : boolean = false
  @Output() loaded = new EventEmitter<boolean>()

  public hospitals : Hospital[] = []
  public total     : number = 0
  public from      : number = 0
  public term      : string = ''

  private subscription$!: Subscription

  
  constructor(private hospitalService: HospitalService,
              private searchService: SearchsService) { }


  ngOnInit(): void {
    this.getHospitals()

    this.subscription$ = this.searchService.search$.subscribe( res => {
      this.term = res
      this.search(this.term) 
    })
  }


  getHospitals(): void {
    this.loaded.emit(true) 
    this.hospitalService.getAllHospitals().subscribe({
      next: res => {
        this.hospitals = res.hospitals
        this.total = res.total
        this.loaded.emit(false)
      },
      error: err => Swal.fire('Error!!!', 'Error inesperado!', 'error') 
    })
  }

  //SEARCH
  search(term: string): void {
    if (term.length === 0) {
      this.getHospitals();
      return;
    }
    this.searchService.search('hospitals', term).subscribe( res => {
      this.hospitals = res.data
      this.total     = res.total   
    })
  }

  createHospital(): void {

  }

  saveHospital(): void {
    
  }

  deleteHospital(): void {

  }

  //OPEN MODAL
  openModal(): void {

  }

  //PAGINATION
  pagination( value: number): void {
    this.from += value;
    if (this.from <  0) { this.from = 0 } 
    if (this.from >= this.total) { this.from -= value }
    this.getHospitals()
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
