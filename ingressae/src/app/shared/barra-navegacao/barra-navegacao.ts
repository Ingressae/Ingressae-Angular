import { Component } from '@angular/core';
import { Avatar } from "../avatar/avatar";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-barra-navegacao',
  standalone: true,
   imports: [Avatar,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './barra-navegacao.html',
  styleUrl: './barra-navegacao.scss',
 
})
export class BarraNavegacaoComponent {

  menuAberto = false;

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu(): void {
    this.menuAberto = false;
  }
}