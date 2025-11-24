import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private readonly AUTH_KEY = 'auth_token';
  private readonly AUTH_USER = 'auth_user';
  private readonly CREDENTIALS = {
    email: 'teste@teste.com',
    password: '1234'
  };

  constructor(private router: Router) {
    // Verifica se há um token válido ao inicializar o serviço
    this.checkAuthStatus();
  }

  // Verifica se há um token válido
  private checkAuthStatus(): void {
    const token = localStorage.getItem(this.AUTH_KEY);
    this.isAuthenticatedSubject.next(!!token);
  }

  // Simula uma requisição de login
  login(email: string, password: string): Observable<boolean> {
    // Simula uma chamada assíncrona
    return of({ email, password }).pipe(
      map(credentials => {
        const isValid = this.validateCredentials(credentials.email, credentials.password);
        if (isValid) {
          const token = this.generateToken();
          localStorage.setItem(this.AUTH_KEY, token);
          localStorage.setItem(this.AUTH_USER, JSON.stringify({ email: credentials.email }));
          this.isAuthenticatedSubject.next(true);
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  // Valida as credenciais
  private validateCredentials(email: string, password: string): boolean {
    return email === this.CREDENTIALS.email && password === this.CREDENTIALS.password;
  }

  // Gera um token simples
  private generateToken(): string {
    return 'token-simulado-' + Math.random().toString(36).substr(2);
  }

  // Faz logout
  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    localStorage.removeItem(this.AUTH_USER);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.AUTH_KEY);
  }

  // Obtém o usuário logado
  getCurrentUser(): { email: string } | null {
    const user = localStorage.getItem(this.AUTH_USER);
    return user ? JSON.parse(user) : null;
  }
}
