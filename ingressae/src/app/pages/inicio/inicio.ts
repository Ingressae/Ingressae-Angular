import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardShow } from './card-show/card-show';
import { Filtros } from './filtros/filtros';
import { AuthService } from '../../services/auth';
import { ToastService } from '../../services/toast';
import { ShowService } from '../../services/show';
import { Show } from '../../models/show';
import { EstadoVazio } from '../../shared/estado-vazio/estado-vazio';
import { Router } from '@angular/router';

interface FiltrosState {
  termo: string;
  localizacao: string;
  genero: string;
  mes: string;
  ordenacao: 'data' | 'nome';
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, CardShow, Filtros, EstadoVazio],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.scss'],
})
export class Inicio implements OnInit {

  private showService = inject(ShowService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  shows = signal<Show[]>([]);
  carregando = signal<boolean>(true);
  filtrosAtivos = signal<FiltrosState>({
    termo: '',
    localizacao: '',
    genero: '',
    mes: '',
    ordenacao: 'data',
  });

  showsFiltrados = computed(() => {
    let resultado = this.shows();
    const filtros = this.filtrosAtivos();

    // Filtro por busca
    if (filtros.termo) {
      const termo = filtros.termo.toLowerCase().trim();
      resultado = resultado.filter(show =>
        show.nome.toLowerCase().includes(termo) ||
        show.local.toLowerCase().includes(termo) ||
        show.artista.toLowerCase().includes(termo)
      );
    }

    // Filtro por localização
    if (filtros.localizacao) {
      resultado = resultado.filter(show => show.estado === filtros.localizacao);
    }

    // Filtro por gênero
    if (filtros.genero) {
      resultado = resultado.filter(show => show.genero === filtros.genero);
    }

    // Filtro por mês/ano
    if (filtros.mes) {
      const [mes, ano] = filtros.mes.split('/');
      resultado = resultado.filter(show => {
        const data = new Date(show.dataEvento);
        const showMes = String(data.getMonth() + 1).padStart(2, '0');
        const showAno = data.getFullYear();
        return showMes === mes && showAno === parseInt(ano);
      });
    }

    // Ordenação
    resultado.sort((a, b) => {
      if (filtros.ordenacao === 'nome') {
        return a.nome.localeCompare(b.nome);
      } else {
        return new Date(a.dataEvento).getTime() - new Date(b.dataEvento).getTime();
      }
    });

    return resultado;
  });

  temResultados = computed(() => this.showsFiltrados().length > 0);

  onFiltrosChange(filtros: FiltrosState) {
    this.filtrosAtivos.set(filtros);
  }

  ngOnInit() {
    this.shows.set(this.showService.buscarTodos());
    this.carregando.set(false);
  }
}
