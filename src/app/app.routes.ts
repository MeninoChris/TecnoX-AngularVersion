import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'produtos',
    loadComponent: () =>
      import('./pages/produtos/produtos.component').then((m) => m.ProdutosComponent),
  },
  {
    path: 'perifericos',
    loadComponent: () =>
      import('./pages/perifericos/perifericos.component').then((m) => m.PerifericosComponent),
  },
  {
    path: 'produto/:id',
    loadComponent: () =>
      import('./pages/produto-detalhe/produto-detalhe.component').then((m) => m.ProdutoDetalheComponent),
  },
  // Rota para a área administrativa com layout próprio
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  // Rota de redirecionamento para compatibilidade com a rota antiga
  {
    path: 'admin/produtos',
    redirectTo: 'admin/produtos',
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./pages/cadastro/cadastro.component').then((m) => m.CadastroComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'sobre',
    loadComponent: () =>
      import('./pages/sobre/sobre.component').then((m) => m.SobreComponent),
  },
  {
    path: 'carrinho',
    loadComponent: () =>
      import('./pages/carrinho/carrinho.component').then((m) => m.CarrinhoComponent),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./pages/checkout/checkout.component').then((m) => m.CheckoutComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
