import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/interfaces'
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public form = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }
  

  ngOnInit(): void {
    // this.form = new FormGroup({
    //   email: new FormControl(null, [Validators.email, Validators.required]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    // })
  }
  submit(){
    if(this.form?.invalid){
      console.log("not valid");
      return
    }
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    //alert('login')
    this.auth.login(user).subscribe(()=>{
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard'])
    })
  }

}
