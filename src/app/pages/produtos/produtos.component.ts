import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

export interface Produto {
  id: string;
  segment?: string;
  name: string;
  price: number;
  category?: string;
  imgSrc: string;
}

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css',
})
export class ProdutosComponent implements OnInit {
  selectedCategory = 'todos';
  sortBy = 'nome';
  allProductsOriginal: Produto[] = [];
  allProducts: Produto[] = [];
  loading = true;
  error: string | null = null;

  categories = [
    { id: 'todos', label: 'Todos os Produtos' },
    { id: 'monitores', label: 'Monitores' },
    { id: 'computadores', label: 'Computadores' },
    { id: 'placas-de-video', label: 'Placas de Vídeo' },
    { id: 'fontes', label: 'Fontes' },
    { id: 'gabinetes', label: 'Gabinetes' },
  ];

  ngOnInit(): void {
    const isBrowser = typeof window !== 'undefined';
    if (!isBrowser) {
      this.loading = false;
      return;
    }
    this.fetchProducts();
  }

  async fetchProducts(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      const isBrowser = typeof window !== 'undefined';
      const apiUrl =
        isBrowser && (window as any).VITE_API_URL
          ? (window as any).VITE_API_URL
          : 'http://localhost:3000';
      const res = await fetch(`${apiUrl}/produtos`);
      if (!res.ok) {
        throw new Error('Falha ao carregar produtos');
      }
      const data = await res.json();
      const list: Produto[] = Array.isArray(data) ? data : [];
      this.allProductsOriginal = list;
      this.applyFilters();
    } catch (e: any) {
      this.error = e?.message || 'Erro ao carregar produtos';
    } finally {
      this.loading = false;
    }
  }

  onCategoryChange(id: string): void {
    this.selectedCategory = id;
    this.applyFilters();
  }

  onSortChange(value: string): void {
    this.sortBy = value;
    this.applyFilters();
  }

  private applyFilters(): void {
    let result =
      this.selectedCategory === 'todos'
        ? [...this.allProductsOriginal]
        : this.allProductsOriginal.filter((p) => p.category === this.selectedCategory);

    if (this.sortBy === 'nome') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === 'preco-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'preco-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    this.allProducts = result;
  }

  onAddToCart(product: Produto): void {
    window.alert('Adicionado ao carrinho');
  }
}
