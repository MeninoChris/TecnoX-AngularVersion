import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchOpen = false;
  searchValue = '';

  toggleSearch(): void {
    this.searchOpen = !this.searchOpen;
  }

  handleSearchSubmit(event: Event): void {
    event.preventDefault();
    if (this.searchValue.trim().length === 0) {
      return;
    }
    alert(`Você buscou: "${this.searchValue}"`);
    this.searchValue = '';
    this.searchOpen = false;
  }
}
