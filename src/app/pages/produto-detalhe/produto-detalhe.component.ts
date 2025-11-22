import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Produto } from '../produtos/produtos.component';

@Component({
  selector: 'app-produto-detalhe',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './produto-detalhe.component.html',
  styleUrl: './produto-detalhe.component.css',
})
export class ProdutoDetalheComponent implements OnInit {
  product: (Produto & { description?: string; specs?: string[] }) | null = null;
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const isBrowser = typeof window !== 'undefined';
    if (!isBrowser) {
      this.loading = false;
      return;
    }

    const stateProduct = (window.history.state && (window.history.state as any).product) as
      | Produto
      | undefined;

    if (stateProduct) {
      this.product = stateProduct as any;
      this.loading = false;
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchProductById(id);
    } else {
      this.loading = false;
      this.error = 'Produto não encontrado.';
    }
  }

  async fetchProductById(id: string): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      const isBrowser = typeof window !== 'undefined';
      const apiUrl =
        isBrowser && (window as any).VITE_API_URL
          ? (window as any).VITE_API_URL
          : 'http://localhost:3000';
      const res = await fetch(`${apiUrl}/produtos`);

      if (res.ok) {
        const data = await res.json();
        const list: any[] = Array.isArray(data) ? data : [];
        const found = list.find((p) => String(p.id) === String(id));
        if (found && found.id) {
          this.product = {
            id: String(found.id),
            name: found.name,
            price: Number(found.price),
            category: found.category,
            imgSrc: found.imgSrc,
            description: found.description,
            specs: found.specs,
          };
          this.loading = false;
          return;
        }
      }

      this.error = 'Produto não encontrado.';
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        this.error = 'Erro ao carregar produto.';
      }
    } finally {
      this.loading = false;
    }
  }

  handleAddToCart(): void {
    if (!this.product) return;
    window.alert('Produto adicionado ao carrinho');
  }

  handleBack(): void {
    this.router.navigate(['/produtos']);
  }
}
