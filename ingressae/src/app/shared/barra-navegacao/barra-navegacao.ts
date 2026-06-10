import { Component } from '@angular/core';
<<<<<<< HEAD
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './barra-navegacao.html',
  styleUrl: './barra-navegacao.scss'
})
export class NavbarComponent {
=======
import { Avatar } from "../avatar/avatar";

@Component({
  selector: 'app-barra-navegacao',
  standalone: true,
  templateUrl: './barra-navegacao.html',
  styleUrl: './barra-navegacao.scss',
  imports: [Avatar]
})
export class BarraNavegacaoComponent {
>>>>>>> main

  menuAberto = false;

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

<<<<<<< HEAD
=======
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
>>>>>>> main
}