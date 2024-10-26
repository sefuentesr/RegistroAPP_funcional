import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  currentUser: string | null; 

  constructor(private authService: AuthService,private router: Router) {
    this.currentUser = this.authService.getCurrentUser(); 
  }

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }
}
