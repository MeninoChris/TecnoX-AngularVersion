import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class CarrinhoComponent implements OnInit {
  items: CartItem[] = [];
  subtotal = 0;
  total = 0;
  frete = 0; // Frete grátis
  cupom = '';

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.items$.subscribe(items => {
      this.items = items;
      this.subtotal = this.cartService.getSubtotal();
      this.total = this.cartService.getTotal();
    });
  }

  onUpdateQuantity(id: number, quantity: number): void {
    this.cartService.updateQuantity(id, quantity);
  }

  onRemoveItem(id: number): void {
    this.cartService.removeItem(id);
  }

  aplicarCupom(): void {
    // Implementar lógica de cupom aqui
    console.log('Aplicando cupom:', this.cupom);
  }

  continuarParaPagamento(): void {
    this.router.navigate(['/checkout']);
  }

  getTotalPrice(item: CartItem): string {
    return (item.preco * item.quantidade).toFixed(2);
  }
}
