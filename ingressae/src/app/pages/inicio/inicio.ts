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
    const todosOsShows = this.shows(); // Evita mutação direta do Signal
    const filtros = this.filtrosAtivos(); //

    // Função utilitária interna para remover acentos e padronizar o texto
    const normalizar = (texto: string) => 
      texto ? texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim() : '';

    // Prepara o termo de busca uma única vez fora do loop (ganho de performance)
    const termoFormatado = normalizar(filtros.termo); //

    // Filtros combinados em uma única varredura O(N)
    let resultado = todosOsShows.filter(show => {
      // 1. Filtro por busca (agora ignorando acentos)
      if (termoFormatado) {
        const nomeShow = normalizar(show.nome); //
        const localShow = normalizar(show.local); //
        const artistaShow = normalizar(show.artista); //

        const atendeTermo = nomeShow.includes(termoFormatado) ||
                            localShow.includes(termoFormatado) ||
                            artistaShow.includes(termoFormatado);
                            
        if (!atendeTermo) return false;
      }

      // 2. Filtro por localização
      if (filtros.localizacao && show.estado !== filtros.localizacao) { //
        return false;
      }

      // 3. Filtro por gênero
      if (filtros.genero && show.genero !== filtros.genero) { //
        return false;
      }

      // 4. Filtro por mês/ano
      if (filtros.mes) { //
        const [mes, ano] = filtros.mes.split('/'); //
        const data = new Date(show.dataEvento); //
        const showMes = String(data.getMonth() + 1).padStart(2, '0'); //
        const showAno = data.getFullYear(); //
        if (showMes !== mes || showAno !== parseInt(ano, 10)) return false; //
      }

      return true;
    });

    // Ordenação segura (usando localeCompare para strings com acento na ordenação por nome)
    return resultado.sort((a, b) => {
      if (filtros.ordenacao === 'nome') { //
        return a.nome.localeCompare(b.nome);
      } else {
        return new Date(a.dataEvento).getTime() - new Date(b.dataEvento).getTime(); //
      }
    });
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
