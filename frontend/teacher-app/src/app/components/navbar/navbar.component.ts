
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentRoute: string ='';

  constructor(private router: Router) {
    this.router.events.subscribe(() => { //emits events related to routing
      this.currentRoute = this.router.url;
    });
  }
}
