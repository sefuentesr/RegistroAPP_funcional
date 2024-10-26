import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    this.authService.loginUser(this.username, this.password).subscribe(
      (users) => {
        if (users.length > 0) {
          this.authService.setCurrentUser(this.username); 
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
        }
      },
      (error) => {
        console.error('Error en el inicio de sesión:', error);
        this.errorMessage = 'Ocurrió un error al intentar iniciar sesión. Por favor, verifica la conexión y vuelve a intentarlo.';
      }
    );
  }
}





