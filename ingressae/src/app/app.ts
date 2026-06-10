import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BarraNavegacaoComponent } from './shared/barra-navegacao/barra-navegacao';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    BarraNavegacaoComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ingressae');

  constructor(private router: Router) {}

  isAuthRoute(): boolean {
    return this.router.url === '/login'
        || this.router.url === '/cadastro';
  }
}