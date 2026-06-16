import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Avatar } from '../avatar/avatar';

@Component({
  selector: 'app-barra-navegacao',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    Avatar
  ],
  templateUrl: './barra-navegacao.html',
  styleUrl: './barra-navegacao.scss'
})
export class BarraNavegacaoComponent {

  menuAberto = false;
  mobileMenuAberto = false;

  constructor(
    private router: Router
  ) {}

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  toggleMobileMenu(): void {
    this.mobileMenuAberto = !this.mobileMenuAberto;
  }

  fecharMenu(): void {
    this.menuAberto = false;
  }

  logout(): void {

    console.log('Usuário deslogado');

    this.fecharMenu();

    this.router.navigate(['/inicio']);
  }

}