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
import { SaibaMais } from './card-show/saiba-mais/saiba-mais';

// Importação das estruturas
import { BuscaSequencial } from '../../shared/estruturas/busca-sequencial';
import { QuickSort } from '../../shared/estruturas/quick-sort';

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
  imports: [CommonModule, CardShow, Filtros, EstadoVazio, SaibaMais],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.scss'],
})
export class Inicio implements OnInit {

  private showService = inject(ShowService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  showSelecionado = signal<Show | null>(null);

  onAbrirModal(show: Show) {
    this.showSelecionado.set(show);
    document.body.style.overflow = 'hidden'; // Evita que a página de fundo role enquanto a modal está aberta
  }

  onFecharModal() {
    this.showSelecionado.set(null);
    document.body.style.overflow = 'auto'; // Devolve o comportamento normal de scroll à página
  }

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
    let resultado = this.shows(); // Copia/leitura inicial do Signal
    const filtros = this.filtrosAtivos(); //

    // 1. Filtro por busca usando a classe BuscaSequencial
    if (filtros.termo) {
      // Realiza a filtragem sequencial priorizando o nome do show
      let filtradoPorNome = BuscaSequencial.filtrar(resultado, filtros.termo, ['nome']);
      
      if (filtradoPorNome.length > 0) {
        resultado = filtradoPorNome;
      } else {
        // Se não achar por nome, busca sequencialmente pelo artista
        resultado = BuscaSequencial.filtrar(resultado, filtros.termo, ['artista']);
      }
    }

    // 2. Filtro por localização usando a BuscaSequencial (Exata por ID/Estado)
    if (filtros.localizacao) {
      resultado = BuscaSequencial.filtrar(resultado, filtros.localizacao, ['estado']);
    }

    // 3. Filtro por gênero usando a BuscaSequencial
    if (filtros.genero) {
      resultado = BuscaSequencial.filtrar(resultado, filtros.genero, ['genero']);
    }

    // 4. Filtro por mês/ano (Mantido manualmente por necessitar de cálculo/conversão de objeto Date)
    if (filtros.mes) {
      const [mes, ano] = filtros.mes.split('/'); //
      resultado = resultado.filter(show => {
        const data = new Date(show.dataEvento); //
        const showMes = String(data.getMonth() + 1).padStart(2, '0'); //
        const showAno = data.getFullYear(); //
        return showMes === mes && showAno === parseInt(ano, 10); //
      });
    }

    // 5. Ordenação utilizando o algoritmo QuickSort
    return QuickSort.sort(resultado, (a, b) => {
      if (filtros.ordenacao === 'nome') { //
        return a.nome.localeCompare(b.nome); //
      } else {
        return new Date(a.dataEvento).getTime() - new Date(b.dataEvento).getTime(); //
      }
    });
  });

  temResultados = computed(() => this.showsFiltrados().length > 0); //

  onFiltrosChange(filtros: FiltrosState) { //
    this.filtrosAtivos.set(filtros); //
  } //

  ngOnInit() { //
    this.shows.set(this.showService.buscarTodos()); //
    this.carregando.set(false); //
  } //
}