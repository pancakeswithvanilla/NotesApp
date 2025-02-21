
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  template: `
    <nav>
      <ul>
        <!-- Conditionally display "Teachers" when on teachers page -->
        <li *ngIf="currentRoute !== '/login' && currentRoute !== '/register'">
          <a routerLink="/teachers" routerLinkActive="active">Teachers</a>
        </li>
        
        <!-- Show Login/Register links when on login or register page -->
        <li *ngIf="currentRoute === '/' || currentRoute === '/login' || currentRoute === '/register'">
          <a routerLink="/login" routerLinkActive="active">Login</a>
        </li>
        <li *ngIf="currentRoute === '/' || currentRoute === '/login' || currentRoute === '/register'">
          <a routerLink="/register" routerLinkActive="active">Register</a>
        </li>
      </ul>
    </nav>
  `,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentRoute: string ='';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }
}
