import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './barra-navegacao.html',
  styleUrl: './barra-navegacao.scss'
})
export class NavbarComponent {

  menuAberto = false;

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

}