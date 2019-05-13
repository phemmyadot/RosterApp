import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/Core/services/auth.service';
import { Router } from '@angular/router';
import { ColorSketchModule } from 'ngx-color/sketch/sketch.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;  
  formData: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) { }

  onSubmit(form: NgForm){
    this.auth.login(form.value).subscribe(
      (res:any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/home');
      },
      err => { 
        console.log(err);
      }
    )
  }
  ngOnInit() {
    if(localStorage.getItem('token') != null)
    this.router.navigateByUrl('/home');
    this.formData = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    })
  }
}
