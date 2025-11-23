import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  imagem: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.getInitialItems());
  items$ = this.itemsSubject.asObservable();

  private getInitialItems(): CartItem[] {
    return [
      {
        id: 1,
        nome: 'Akko Tac75 HE Magnetico',
        preco: 503.99,
        quantidade: 1,
        imagem: '/assets/images/TacHE75.png',
      },
      {
        id: 2,
        nome: 'AJAZZ AK820 Mecanico',
        preco: 381.08,
        quantidade: 1,
        imagem: '/assets/images/AjazzK.png',
      }
    ];
  }

  updateQuantity(id: number, newQuantity: number): void {
    const items = this.itemsSubject.value.map(item => 
      item.id === id ? { ...item, quantidade: Math.max(1, newQuantity) } : item
    );
    this.itemsSubject.next(items);
  }

  removeItem(id: number): void {
    const items = this.itemsSubject.value.filter(item => item.id !== id);
    this.itemsSubject.next(items);
  }

  getItems(): CartItem[] {
    return this.itemsSubject.value;
  }

  getSubtotal(): number {
    return this.itemsSubject.value.reduce((total: number, item) => {
      return total + (item.preco * item.quantidade);
    }, 0);
  }

  getTotal(): number {
    return this.getSubtotal(); // Frete grátis
  }
}
