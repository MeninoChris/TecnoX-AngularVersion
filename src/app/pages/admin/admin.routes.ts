import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
        data: { title: 'Dashboard' }
      },
      {
        path: 'produtos',
        loadComponent: () =>
          import('../admin-produtos/admin-produtos.component').then((m) => m.AdminProdutosComponent),
        data: { title: 'Gerenciar Produtos' }
      },
      // Adicione mais rotas de administração aqui
    ]
  }
];
