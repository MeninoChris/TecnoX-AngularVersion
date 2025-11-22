import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CarroselComponent, CarouselProduct } from '../../components/carrosel/carrosel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CarroselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: CarouselProduct[] = [
    { id: 1, name: 'Akko Tac75 HE Magnetico', price: 'R$503,99', imgSrc: '/images-home/TacHE75.png' },
    { id: 2, name: 'Akko MonsGeek FUN60', price: 'R$367,47', imgSrc: '/images-home/Moonsgeek6.png' },
    { id: 3, name: 'AJAZZ AK820 Mecanico', price: 'R$381,08', imgSrc: '/images-home/AjazzK.png' },
    { id: 4, name: 'AULA HERO 68HE Magnetico', price: 'R$587,18', imgSrc: '/images-home/Hero.png' },
    { id: 5, name: 'Logitech G435 LIGHTSPEED', price: 'R$499,98', imgSrc: '/images-home/Logi.png' },
    { id: 6, name: 'Binnune BW06 HEADSET 2,4Ghz', price: 'R$288,07', imgSrc: '/images-home/Binune.png' },
    { id: 7, name: 'NUBWO G06 HEADSET GAMER', price: 'R$358,09', imgSrc: '/images-home/Nub.png' },
    { id: 8, name: 'Baseus GH02 Gaming', price: 'R$718,67', imgSrc: '/images-home/Baseus.png' },
    { id: 9, name: 'Attack Shark X11 Base', price: 'R$207,86', imgSrc: '/images-home/Shark.png' },
    { id: 10, name: 'MousePad Dragão ', price: 'R$56,08', imgSrc: '/images-home/Dragão.png' },
    { id: 11, name: 'MousePad Exco Sports', price: 'R$246,97', imgSrc: '/images-home/Pad.png' },
    { id: 12, name: 'Fone de Ouvido BUDS 6 Xiaomi', price: 'R$206,99', imgSrc: '/images-home/Buds.png' },
  ];
}
