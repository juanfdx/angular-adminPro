import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public active : boolean = false
  public registerForm : FormGroup
  public formSubmitted = false;


  constructor(private fb: FormBuilder) {

    this.registerForm = this.fb.group({
      name:      ['', [ Validators.required, Validators.minLength(3) ]],
      lastName:  ['', [ Validators.required, Validators.minLength(3) ]],
      email:     ['', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]],
      password:  ['', [ Validators.required, Validators.minLength(6) ]],
      password2: ['', [ Validators.required, Validators.minLength(6) ]],
      terms:     [ false, [ Validators.requiredTrue ]]
    }, {
      validators: this.mustMatch('password', 'password2')
    })
   }

  ngOnInit(): void { }


  setActive(): void {
    this.active = !this.active
    this.registerForm.get('terms')?.setValue(this.active)
  }

  createUser(): void {
    this.formSubmitted = true;
    console.log(this.registerForm.valid);


    if (this.registerForm.invalid) {
      return;  
    } 
  }


  //Errors methods:
  isRequired(field: string): boolean {
    if (this.registerForm.controls[field].getError('required') && this.formSubmitted) {
      return true
    }
    return false
  }

  minLength(field: string): boolean {
    return this.registerForm.controls[field].getError('minlength')
  }

  isEmail(): boolean {
    if (this.registerForm.controls['email'].getError('pattern')) {
      return true
    }
    return false
  }

  password2Match(): boolean {
    if (this.registerForm.controls['password2'].getError('mustMatch')) {
      return true
    }
    return false
  }

  //para que el form reactivo detecte si los passwords son iguales y funcione con el Validators
  mustMatch(password: string, password2: string) {
    //instancia de FormGroup, para obtener acceso a los controles del formulario
    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(password);
      const pass2Control = formGroup.get(password2);

      if (pass2Control?.errors && pass2Control.errors['mustMatch']) {
        return
      }

      if ( pass1Control?.value !== pass2Control?.value ) {
        pass2Control?.setErrors({ mustMatch: true });
        
      } else {
        // pass2Control?.setErrors(null);

      }
    }
  }



}
