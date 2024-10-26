import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importar el operador map

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  registerUser(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(this.apiUrl, body);
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}&password=${password}`);
  }

  logout(): void {
    localStorage.removeItem('currentUser'); 
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser'); 
  }

  getCurrentUser(): string | null {
    return localStorage.getItem('currentUser'); 
  }

  isUserRegistered(username: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => !!users.find(user => user.username === username)) 
    );
  }

  resetPassword(username: string): Observable<any> {
    return this.isUserRegistered(username).pipe(
      map(isRegistered => {
        if (isRegistered) {
          console.log(`Se envió una solicitud para restablecer la contraseña del usuario: ${username}`);
          return this.http.post(`${this.apiUrl}/reset-password`, { username }); 
        } else {
          throw new Error('Usuario no registrado'); 
        }
      })
    );
  }

  setCurrentUser(username: string): void {
    localStorage.setItem('currentUser', username); 
  }
}

