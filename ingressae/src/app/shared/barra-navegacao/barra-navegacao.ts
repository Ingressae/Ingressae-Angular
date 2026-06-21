import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener
} from '@angular/core';

import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { Avatar } from '../avatar/avatar';
import { ToastService } from '../../services/toast';
import { AuthService } from '../../services/auth';

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
    private router: Router,
    private toast: ToastService,
    private authService: AuthService,
    private elementRef: ElementRef
  ) {}

  get iniciaisUsuario(): string {

    const usuario = this.authService.usuario();

    if (!usuario) {
      return '??';
    }

    return usuario.nome
      .split(' ')
      .map(nome => nome[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

  }

  get fotoUsuario(): string | undefined {

    return this.authService.usuario()?.fotoUrl;

  }

  get nomeUsuario(): string {

    return this.authService.usuario()?.nome ?? 'Usuário';

  }

  get estaLogado(): boolean {

    return this.authService.estaLogado();

  }

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

    this.authService.logout();

    this.toast.aviso('Usuário deslogado');

    this.fecharMenu();

    this.router.navigate(['/inicio']);

  }

  @HostListener('document:click', ['$event'])
  onClickFora(event: MouseEvent): void {

    if (
      !this.elementRef.nativeElement.contains(event.target)
    ) {

      this.menuAberto = false;

    }

  }

}