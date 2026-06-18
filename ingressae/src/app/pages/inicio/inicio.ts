import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardShow } from './card-show/card-show';
import { AuthService } from '../../services/auth';
import { ToastService } from '../../services/toast';
import { ShowService } from '../../services/show';
import { Show } from '../../models/show';
import { EstadoVazio } from '../../shared/estado-vazio/estado-vazio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, CardShow, FormsModule, EstadoVazio],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.scss'],
})
export class Inicio implements OnInit {

  private showService = inject(ShowService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  shows = signal<Show[]>([]);
  termoBusca = signal<string>('');
  carregando = signal<boolean>(true);

  showsFiltrados = computed(() => {
    const termo = this.termoBusca().toLowerCase().trim();
    if (!termo) return this.shows();

    return this.shows().filter(show =>
      show.nome.toLowerCase().includes(termo) ||
      show.local.toLowerCase().includes(termo) ||
      show.artista.toLowerCase().includes(termo)
    );
  });

  temResultados = computed(() => this.showsFiltrados().length > 0);

  ngOnInit() {
    this.shows.set(this.showService.buscarTodos());
    this.carregando.set(false);
  }
}