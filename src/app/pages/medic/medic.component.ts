import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicService } from 'src/app/services/medic.service';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.scss']
})

export class MedicComponent implements OnInit {

  public medicForm! : FormGroup
  public hospitals: any[] = [];

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicService: MedicService) { }


  ngOnInit(): void {
    this.medicForm = this.fb.group({
      name:     ['Juan', [ Validators.required ]],
      lastName: ['Fernandez', [ Validators.required ]],
      hospital: ['', [ Validators.required ]],
    })

    this.getHospitals()
  }

  getMedic(): void {

  }

  saveMedic(): void {
    console.log(this.medicForm.value);
    
  }

  getHospitals(): void {
    this.hospitalService.getAllHospitals().subscribe( res => {
      this.hospitals = res.hospitals  
    })
  }

  updateMedic(medic: any): void {

  }

}
