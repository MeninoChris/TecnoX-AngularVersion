import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

export interface PerifericoProduto {
  id: string | number;
  segment?: string;
  name: string;
  price: number;
  category?: string;
  imgSrc: string;
}

@Component({
  selector: 'app-perifericos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './perifericos.component.html',
  styleUrl: './perifericos.component.css',
})
export class PerifericosComponent implements OnInit {
  selectedCategory = 'todos';
  sortBy = 'nome';
  allProducts: PerifericoProduto[] = [];
  loading = true;
  error: string | null = null;

  categories = [
    { id: 'todos', label: 'Todos os Produtos' },
    { id: 'teclados', label: 'Teclados' },
    { id: 'mouses', label: 'Mouses' },
    { id: 'headsets', label: 'Headsets' },
    { id: 'mousepads', label: 'MousePads' },
    { id: 'fones', label: 'Fones de Ouvido' },
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
      const list: PerifericoProduto[] = Array.isArray(data) ? data : [];
      // Igual ao React: filtrar segment === 'perifericos'
      this.allProducts = list.filter(
        (p) => !p.segment || p.segment === 'perifericos'
      );
      this.applySort();
    } catch (e: any) {
      this.error = e?.message || 'Erro ao carregar produtos';
    } finally {
      this.loading = false;
    }
  }

  get filteredProducts(): PerifericoProduto[] {
    let result =
      this.selectedCategory === 'todos'
        ? [...this.allProducts]
        : this.allProducts.filter((p) => p.category === this.selectedCategory);

    result = this.sortList(result);
    return result;
  }

  onCategoryChange(id: string): void {
    this.selectedCategory = id;
  }

  onSortChange(value: string): void {
    this.sortBy = value;
    this.applySort();
  }

  private applySort(): void {
    this.allProducts = this.sortList([...this.allProducts]);
  }

  private sortList(list: PerifericoProduto[]): PerifericoProduto[] {
    if (this.sortBy === 'nome') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === 'preco-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'preco-desc') {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }

  onAddToCart(product: PerifericoProduto): void {
    // No Angular ainda não temos o util de carrinho migrado, então usamos um alerta simples
    window.alert('Adicionado ao carrinho');
  }
}
