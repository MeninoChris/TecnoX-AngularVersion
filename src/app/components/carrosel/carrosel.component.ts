import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface CarouselProduct {
  id: number;
  name: string;
  price: string;
  imgSrc: string;
}

@Component({
  selector: 'app-products-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrosel.component.html',
  styleUrl: './carrosel.component.css',
})
export class CarroselComponent {
  products = input<CarouselProduct[]>();

  @ViewChild('scrollRef', { static: false })
  scrollRef?: ElementRef<HTMLDivElement>;

  scroll(direction: 'left' | 'right'): void {
    const el = this.scrollRef?.nativeElement;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const scrollAmount = clientWidth;

    if (direction === 'left') {
      if (scrollLeft <= 5) {
        el.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    } else {
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 5;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }
}
