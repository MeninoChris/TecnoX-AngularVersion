import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  usuario = '';
  senha = '';

  constructor(private router: Router) {}

  async handleLogin(): Promise<void> {
    if (!this.usuario || !this.senha) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const apiUrl = (window as any).VITE_API_URL || 'http://localhost:3000';
      const res = await fetch(
        `${apiUrl}/usuarios?usuario=${encodeURIComponent(this.usuario)}&senha=${encodeURIComponent(this.senha)}`
      );
      const data = await res.json();

      if (Array.isArray(data) && data.length === 1) {
        localStorage.setItem('logado', 'true');
        try {
          const user = data[0] || { usuario: this.usuario };
          localStorage.setItem(
            'usuarioLogado',
            JSON.stringify({
              id: user.id,
              email: user.usuario || this.usuario,
            })
          );
        } catch {}
        alert('Login realizado com sucesso!');
        this.router.navigate(['/']);
      } else {
        alert('Usuário ou senha incorretos!');
      }
    } catch (e) {
      alert('Erro ao conectar ao servidor de autenticação.');
    }
  }
}
