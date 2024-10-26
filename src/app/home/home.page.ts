import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  welcomeMessage: string = '';  
  username: string | null = null; 

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.setWelcomeMessage();
  }

  private setWelcomeMessage(): void {
    this.username = this.authService.getCurrentUser(); 

    if (this.username) {
      this.welcomeMessage = `Bienvenido, ${this.username}`; 
    } else {
      this.welcomeMessage = 'Bienvenido, usuario desconocido';
      this.router.navigate(['/login']); 
    }
  }

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }
}

