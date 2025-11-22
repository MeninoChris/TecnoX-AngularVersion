import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent {
  usuario = '';
  senha = '';
  confirmar = '';

  constructor(private router: Router) {}

  async handleCadastro(): Promise<void> {
    if (!this.usuario || !this.senha) {
      alert('Preencha todos os campos!');
      return;
    }

    if (this.senha !== this.confirmar) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      const apiUrl = (window as any).VITE_API_URL || 'http://localhost:3000';

      const checkRes = await fetch(
        `${apiUrl}/usuarios?usuario=${encodeURIComponent(this.usuario)}`
      );
      const existente = await checkRes.json();
      if (Array.isArray(existente) && existente.length > 0) {
        alert('Usuário já cadastrado!');
        return;
      }

      await fetch(`${apiUrl}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: this.usuario, senha: this.senha }),
      });

      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/login']);
    } catch {
      alert('Erro ao conectar ao servidor de cadastro.');
    }
  }
}
