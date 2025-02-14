import { Component,Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username:string = "";
  password:string = "";
  confpassword:string = ""
  errorMessage:string = ""
  @Input() logreg:string = ""
  constructor(private router:Router, private authService:AuthService)
  {

  }
  submitForm() {
    if (this.logreg === 'Register Page') {
      this.register();
    } else {
      this.login();
    }
  }
  register() {
    const userData = { username: this.username, password: this.password, confpassword: this.confpassword};
    this.authService.register(userData).subscribe(
      response => {
        this.router.navigate(['/login'])
      },
      error => {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    );
  }
  login(){
    this.authService.login({ username: this.username, password: this.password }).subscribe(response =>{
      console.log("Backend Response:", response);  
      this.authService.saveToken(response.access, response.refresh);
      this.router.navigate(['/teachers'])
    }, (error)=>{
      console.log("An error occured while logging in: ", error)
    })
  }


}
