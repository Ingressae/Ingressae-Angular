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

type FiltroData = 'todos' | 'semana' | 'mes' | 'tres-meses';
type OrdenacaoShow = 'data' | 'nome';

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
  filtroData = signal<FiltroData>('todos');
  ordenacao = signal<OrdenacaoShow>('data');

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

    // Filtro por data
    resultado = resultado.filter(show => {
      const dataEvento = new Date(show.dataEvento);
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      switch (this.filtroData()) {
        case 'semana':
          const fimSemana = new Date(hoje);
          fimSemana.setDate(fimSemana.getDate() + 7);
          return dataEvento >= hoje && dataEvento <= fimSemana;

        case 'mes':
          const fimMes = new Date(hoje);
          fimMes.setMonth(fimMes.getMonth() + 1);
          return dataEvento >= hoje && dataEvento <= fimMes;

        case 'tres-meses':
          const fimTresMeses = new Date(hoje);
          fimTresMeses.setMonth(fimTresMeses.getMonth() + 3);
          return dataEvento >= hoje && dataEvento <= fimTresMeses;

        case 'todos':
        default:
          return true;
      }
    });

    // Ordenação
    resultado.sort((a, b) => {
      if (this.ordenacao() === 'data') {
        return new Date(a.dataEvento).getTime() - new Date(b.dataEvento).getTime();
      } else {
        return a.nome.localeCompare(b.nome);
      }
    });

    return resultado;
  });

  temResultados = computed(() => this.showsFiltrados().length > 0);

  ngOnInit() {
    this.shows.set(this.showService.buscarTodos());
    this.carregando.set(false);
  }
}