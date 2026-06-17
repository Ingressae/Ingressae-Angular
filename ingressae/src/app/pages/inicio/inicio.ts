import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardShow, Show } from './card-show/card-show';
import { AuthService } from '../../services/auth';
import { ToastService } from '../../services/toast';
import { EstadoVazio } from '../../shared/estado-vazio/estado-vazio';
import { Router } from '@angular/router';
import { Filtros, FiltrosSelecionados } from './filtros/filtros';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, CardShow, FormsModule, EstadoVazio, Filtros ],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.scss'],
})

export class Inicio implements OnInit {

  // Signals
  cardShows = signal<Show[]>([]);
  termoBusca = signal<string>('');
  carregando = signal<boolean>(true);

// Computed: Filtra os shows com base no termo de busca adaptado para o novo formato
  showsFiltrados = computed(() => {
    let resultados = this.cardShows();
    const termo = this.termoBusca().toLowerCase().trim();
    const filtros = this.filtrosAtivos(); // Se tiveres os filtros de botões ativos

    // 1. Filtro da Barra de Pesquisa (pesquisa no Nome, Artista ou Local)
    if (termo) {
      resultados = resultados.filter(show => 
        show.nome.toLowerCase().includes(termo) || 
        show.artista.toLowerCase().includes(termo) || 
        show.local.toLowerCase().includes(termo)
      );
    }

    // 2. Filtro por botão de Localização (ex: "SP", "RJ")
    if (filtros?.localizacao) {
      resultados = resultados.filter(show => 
        show.local.toLowerCase().includes(filtros.localizacao.toLowerCase())
      );
    }

    // 3. Filtro por Gênero (caso exista no objeto)
    if (filtros?.genero) {
      resultados = resultados.filter(show => show.genero === filtros.genero);
    }

    return resultados;
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

  //Filtros
  filtrosAtivos = signal<FiltrosSelecionados>({
    localizacao: '',
    genero: '',
    data: ''
  });

  aplicarFiltros(filtros: FiltrosSelecionados) {
    this.filtrosAtivos.set(filtros);
  }

// A lista estática atualizada para o NOVO formato da Interface
  shows: Show[] = [
    { 
      id: '1', // O id agora é uma string (texto)
      nome: 'World Tour',
      artista: 'The Weeknd',
      local: 'Allianz Parque, São Paulo',
      dataEvento: '2026-03-15T20:00:00', // Formato de data reconhecido pelo Angular
      imagemCapaUrl: 'https://placehold.co/600x200/8b5cf6/ffffff?text=The+Weeknd', // Imagem de exemplo
      dataFilaPreferencial: '2026-03-10T10:00:00', // Preenchido = fila disponível
      dataFilaNormal: '2026-03-12T10:00:00',       // Preenchido = fila disponível
      fasClubeId: 'fc-01',
      descricao: 'A grande turnê mundial The Weeknd.',
      genero: 'R&B'
    },
    { 
      id: '2', 
      nome: 'Music Of The Spheres',
      artista: 'Coldplay',
      local: 'Estádio do Morumbi, SP',
      dataEvento: '2026-04-22T20:00:00',
      imagemCapaUrl: 'https://placehold.co/600x200/00a2ff/ffffff?text=Coldplay',
      dataFilaPreferencial: '2026-04-10T10:00:00',
      dataFilaNormal: null, // Nulo = fila indisponível
      fasClubeId: 'fc-02',
      descricao: 'Turnê sustentável do Coldplay.',
      genero: 'Rock'
    },
    { 
      id: '3', 
      nome: 'Eras Tour Brasil',
      artista: 'Taylor Swift',
      local: 'Engenhão, Rio de Janeiro',
      dataEvento: '2026-05-10T20:00:00',
      imagemCapaUrl: 'https://placehold.co/600x200/ff3083/ffffff?text=Taylor+Swift',
      dataFilaPreferencial: null, 
      dataFilaNormal: null, 
      fasClubeId: 'fc-03',
      descricao: 'Uma jornada por todas as eras musicais.',
      genero: 'Pop'
    },
    { 
      id: '4', 
      nome: 'Imagine Dragons Live',
      artista: 'Imagine Dragons',
      local: 'Arena MRV, Belo Horizonte',
      dataEvento: '2026-06-02T20:00:00',
      imagemCapaUrl: 'https://placehold.co/600x200/00ffd0/111111?text=Imagine+Dragons',
      dataFilaPreferencial: '2026-05-20T10:00:00',
      dataFilaNormal: null,
      fasClubeId: 'fc-04',
      descricao: 'Show ao vivo com os maiores sucessos.',
      genero: 'Rock'
    },
    { 
      id: '5', 
      nome: 'Future Nostalgia',
      artista: 'Dua Lipa',
      local: 'Jeunesse Arena, RJ',
      dataEvento: '2026-07-18T20:00:00',
      imagemCapaUrl: 'https://placehold.co/600x200/ff00e6/ffffff?text=Dua+Lipa',
      dataFilaPreferencial: '2026-07-01T10:00:00',
      dataFilaNormal: '2026-07-05T10:00:00',
      fasClubeId: 'fc-05',
      descricao: 'A turnê de sucesso do álbum Future Nostalgia.',
      genero: 'Pop'
    },
    { 
      id: '6', 
      nome: 'Lindo, Bonito e Joiado',
      artista: 'Falcão',
      local: 'Allianz Parque, São Paulo',
      dataEvento: '2026-08-05T20:00:00',
      imagemCapaUrl: 'https://placehold.co/600x200/ff811b/ffffff?text=Falcao',
      dataFilaPreferencial: '2026-07-20T10:00:00',
      dataFilaNormal: '2026-07-25T10:00:00',
      fasClubeId: 'fc-06',
      descricao: 'Show de humor e música brega.',
      genero: 'MPB'
    },
  ];

}