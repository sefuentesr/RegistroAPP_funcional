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
  public buffer = 0.06;
  public progress = 0;
  private isProgressEnabled = false;
  public showProgressBar = false;
  

  constructor(private authService: AuthService, private router: Router) {
    setInterval(() => {
      if (this.isProgressEnabled) {
        this.buffer += 0.34;
        this.progress += 0.34;

        // Reset the progress bar when it reaches 100%
        // to continuously show the demo
        if (this.progress > 1) {
          setTimeout(() => {
            this.buffer = 0.04;
            this.progress = 0;
          }, 1000);
        }
      }
    }, 1000);
  }
  

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    this.authService.loginUser(this.username, this.password).subscribe(
      (users) => {
        if (users.length > 0) {
          this.authService.setCurrentUser(this.username); 
          this.isProgressEnabled = true; // Enable progress bar on successful login
          this.showProgressBar = true
          setTimeout(() => {
            this.router.navigate(['/home']);
            this.isProgressEnabled = false; // Disable progress bar after navigation
          }, 3000); // 3-second delay
        } else {
          this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
          this.isProgressEnabled = false;
        }
      },
      (error) => {
        console.error('Error en el inicio de sesión:', error);
        this.errorMessage = 'Ocurrió un error al intentar iniciar sesión. Por favor, verifica la conexión y vuelve a intentarlo.';
        this.isProgressEnabled = false;
      }
    );
  }
}





