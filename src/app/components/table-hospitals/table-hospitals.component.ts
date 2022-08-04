import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hospital } from 'src/app/interfaces/hospital.interface';
import { HospitalService } from 'src/app/services/hospital.service';
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

  constructor(private hospitalService: HospitalService) { }


  ngOnInit(): void {
    this.getHospitals()
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
}
