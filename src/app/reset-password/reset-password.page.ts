import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  username: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  resetPassword() {
    this.authService.resetPassword(this.username).subscribe(
      response => {
        this.message = 'Se ha enviado un correo para restablecer tu contraseña.';
      },
      (error) => {
        this.message = error.message; 
      }
    );
  }
}
