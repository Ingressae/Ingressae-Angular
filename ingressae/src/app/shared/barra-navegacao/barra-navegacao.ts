import { Component } from '@angular/core';
import { Avatar } from "../avatar/avatar";

@Component({
  selector: 'app-barra-navegacao',
  standalone: true,
  templateUrl: './barra-navegacao.html',
  styleUrl: './barra-navegacao.scss',
  imports: [Avatar]
})
export class BarraNavegacaoComponent {

  menuAberto = false;

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu(): void {
    this.menuAberto = false;
  }

  perfil(): void {
    console.log('Abrir perfil');
    this.fecharMenu();
  }

  logout(): void {
    console.log('Logout');
    this.fecharMenu();
  }
}