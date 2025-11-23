import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface FormData {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  metodoPagamento: string;
  numeroCartao: string;
  nomeCartao: string;
  validade: string;
  cvv: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  formData: FormData = {
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    metodoPagamento: 'credito',
    numeroCartao: '',
    nomeCartao: '',
    validade: '',
    cvv: ''
  };

  etapa = 1;
  aceitouTermos = false;

  constructor(private router: Router) {}

  onSubmit() {
    if (this.etapa < 3) {
      this.etapa++;
    } else {
      alert('Compra finalizada com sucesso!');
      this.router.navigate(['/']);
    }
  }

  voltar() {
    if (this.etapa > 1) {
      this.etapa--;
    } else {
      this.router.navigate(['/carrinho']);
    }
  }
}
