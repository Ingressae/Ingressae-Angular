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
  filtroLocalizacao = signal<string>('');
  filtroGenero = signal<string>('');
  filtroMes = signal<string>('');

  temFiltrosAtivos = computed(() => {
    return !!this.termoBusca() || !!this.filtroLocalizacao() || !!this.filtroGenero() || !!this.filtroMes();
  });

  estados = computed(() => {
    const estadosSet = new Set<string>();
    this.shows().forEach(show => {
      if (show.estado) estadosSet.add(show.estado);
    });
    return Array.from(estadosSet).sort();
  });

  generos = computed(() => {
    const generosSet = new Set<string>();
    this.shows().forEach(show => {
      if (show.genero) generosSet.add(show.genero);
    });
    return Array.from(generosSet).sort();
  });

  mesesDisponiveis = computed(() => {
    const mesesSet = new Set<string>();
    this.shows().forEach(show => {
      const data = new Date(show.dataEvento);
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      mesesSet.add(`${mes}/${ano}`);
    });
    return Array.from(mesesSet).sort().reverse();
  });

  showsFiltrados = computed(() => {
    let resultado = this.shows();

    // Filtro por busca
    const termo = this.termoBusca().toLowerCase().trim();
    if (termo) {
      resultado = resultado.filter(show =>
        show.nome.toLowerCase().includes(termo) ||
        show.local.toLowerCase().includes(termo) ||
        show.artista.toLowerCase().includes(termo)
      );
    }

    // Filtro por localização
    if (this.filtroLocalizacao()) {
      resultado = resultado.filter(show => show.estado === this.filtroLocalizacao());
    }

    // Filtro por gênero
    if (this.filtroGenero()) {
      resultado = resultado.filter(show => show.genero === this.filtroGenero());
    }

    // Filtro por mês/ano
    if (this.filtroMes()) {
      const [mes, ano] = this.filtroMes().split('/');
      resultado = resultado.filter(show => {
        const data = new Date(show.dataEvento);
        const showMes = String(data.getMonth() + 1).padStart(2, '0');
        const showAno = data.getFullYear();
        return showMes === mes && showAno === parseInt(ano);
      });
    }

    // Ordenar por data
    resultado.sort((a, b) => {
      return new Date(a.dataEvento).getTime() - new Date(b.dataEvento).getTime();
    });

    return resultado;
  });

  temResultados = computed(() => this.showsFiltrados().length > 0);

  limparFiltros() {
    this.termoBusca.set('');
    this.filtroLocalizacao.set('');
    this.filtroGenero.set('');
    this.filtroMes.set('');
  }

  ngOnInit() {
    this.shows.set(this.showService.buscarTodos());
    this.carregando.set(false);
  }
}