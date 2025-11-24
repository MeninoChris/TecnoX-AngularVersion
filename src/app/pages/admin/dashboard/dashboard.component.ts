import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats = [
    { title: 'Total de Vendas', value: '2,345', icon: 'fas fa-shopping-cart', color: 'primary' },
    { title: 'Total de Pedidos', value: '1,234', icon: 'fas fa-clipboard-list', color: 'success' },
    { title: 'Produtos', value: '567', icon: 'fas fa-box', color: 'info' },
    { title: 'Usuários', value: '89', icon: 'fas fa-users', color: 'warning' },
  ];

  recentOrders = [
    { id: '#OR-1234', customer: 'João Silva', date: '24/11/2024', amount: 'R$ 1.234,00', status: 'Completo' },
    { id: '#OR-1233', customer: 'Maria Santos', date: '23/11/2024', amount: 'R$ 890,00', status: 'Processando' },
    { id: '#OR-1232', customer: 'Pedro Oliveira', date: '23/11/2024', amount: 'R$ 2.450,00', status: 'Enviado' },
    { id: '#OR-1231', customer: 'Ana Costa', date: '22/11/2024', amount: 'R$ 1,750.00', status: 'Completo' },
  ];

  topProducts = [
    { name: 'Teclado Mecânico RGB', sales: 234, revenue: 'R$ 15.678,00' },
    { name: 'Mouse Gamer Pro', sales: 189, revenue: 'R$ 9.450,00' },
    { name: 'Monitor 27" 144Hz', sales: 156, revenue: 'R$ 31.200,00' },
    { name: 'Headset Gamer 7.1', sales: 132, revenue: 'R$ 10,560.00' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completo':
        return 'badge bg-success';
      case 'processando':
        return 'badge bg-warning';
      case 'enviado':
        return 'badge bg-info';
      default:
        return 'badge bg-secondary';
    }
  }
}
