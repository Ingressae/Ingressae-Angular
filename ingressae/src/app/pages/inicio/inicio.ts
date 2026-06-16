import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardShow, Show } from './card-show/card-show';
import { AuthService } from '../../services/auth';
import { ToastService } from '../../services/toast';
import { EstadoVazio } from '../../shared/estado-vazio/estado-vazio';
import { Loading } from '../../shared/loading/loading';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, CardShow, FormsModule, EstadoVazio, Loading],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.scss'],
})
export class Inicio implements OnInit {

  // A lista original estática (pode vir de uma API no futuro)
  shows: Show[] = [
    { id: 1, title: 'The Weeknd World Tour', date: '15 Mar 2026', location: 'Allianz Parque, São Paulo', gradientClass: 'grad-purple', prefAvailable: true, normalAvailable: true },
    { id: 2, title: 'Coldplay — Music Of The Spheres', date: '22 Abr 2026', location: 'Estádio do Morumbi, SP', gradientClass: 'grad-blue', prefAvailable: true, normalAvailable: false },
    { id: 3, title: 'Taylor Swift — Eras Tour Brasil', date: '10 Mai 2026', location: 'Engenhão, Rio de Janeiro', gradientClass: 'grad-redPurple', prefAvailable: false, normalAvailable: false },
    { id: 4, title: 'Imagine Dragons Live', date: '02 Jun 2026', location: 'Arena MRV, Belo Horizonte', gradientClass: 'grad-cyan', prefAvailable: true, normalAvailable: false },
    { id: 5, title: 'Dua Lipa — Future Nostalgia', date: '18 Jul 2026', location: 'Jeunesse Arena, RJ', gradientClass: 'grad-purple', prefAvailable: true, normalAvailable: true },
    { id: 6, title: 'Falcão — Lindo, Bonito e Joiado', date: '05 Ago 2026', location: 'Allianz Parque, São Paulo', gradientClass: 'grad-orange', prefAvailable: true, normalAvailable: true },
  ];

  // Signals
  cardShows = signal<Show[]>([]);
  termoBusca = signal<string>('');
  carregando = signal<boolean>(true);

  // Computed: Filtra os shows com base no termo de busca
  showsFiltrados = computed(() => {
    const termo = this.termoBusca().toLowerCase().trim();
    if (!termo) return this.cardShows();

    // Usando filter nativo para garantir a busca insensível a maiúsculas/minúsculas
    return this.cardShows().filter(show => 
      show.title.toLowerCase().includes(termo) || 
      show.location.toLowerCase().includes(termo)
    );
  });

  temResultados = computed(() => this.showsFiltrados().length > 0);

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    // Alimenta o signal com os dados e desativa o carregamento
    this.cardShows.set(this.shows);
    this.carregando.set(false);
  }
}