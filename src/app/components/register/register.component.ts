import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  hide = true;  
  
  formData: FormGroup;
  constructor( private fb: FormBuilder) { 
    this.formData = this.fb.group({
      username: ['', [Validators.email]],
      fullname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmpassword: ['']
    }, { validator: this.checkPasswords })
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let password = group.controls.password.value;
    let confirmpassword = group.controls.confirmpassword.value;

    return password === confirmpassword ? null : { notSame: true }
  }

  ngOnInit() {
    
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
