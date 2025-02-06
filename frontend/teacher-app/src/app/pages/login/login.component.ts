import { Component } from '@angular/core';
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
  errorMessage:string = ""
  constructor(private router:Router, private authService:AuthService)
  {

  }
  login(){
    this.authService.login({ username: this.username, password: this.password }).subscribe(response =>{
      this.authService.saveToken(response.access);
      this.router.navigate(['/teachers'])
    }, (error)=>{
      console.log("An error occured while logging in: ", error)
    })
  }


}
