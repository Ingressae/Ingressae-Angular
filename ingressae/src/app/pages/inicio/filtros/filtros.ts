import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FiltrosSelecionados {
  localizacao: string;
  genero: string;
  data: string;
}

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filtros.html',
  styleUrls: ['./filtros.scss']
})
export class Filtros {
  @Output() aoFiltrar = new EventEmitter<FiltrosSelecionados>();

  // Dados mockados para os filtros
  estados = ['SP', 'RJ', 'MG', 'PR', 'RS', 'SC', 'BA', 'CE', 'PE', 'DF'];
  generos = ['Pop', 'Rock', 'Indie', 'Eletrônica', 'Sertanejo', 'MPB', 'Rap', 'R&B'];
  datas = ['mar/26', 'abr/26', 'mai/26', 'jun/26', 'jul/26', 'ago/26'];

  // Signal para controlar qual dropdown está aberto
  menuAberto = signal<'localizacao' | 'genero' | 'data' | null>(null);

  // Signal para armazenar as seleções atuais
  selecionado = signal<FiltrosSelecionados>({
    localizacao: '',
    genero: '',
    data: ''
  });

  toggleMenu(menu: 'localizacao' | 'genero' | 'data') {
    // Se clicar no mesmo menu, fecha. Se clicar em outro, abre o novo.
    this.menuAberto.set(this.menuAberto() === menu ? null : menu);
  }

  selecionarItem(tipo: keyof FiltrosSelecionados, valor: string) {
    const atual = this.selecionado();
    
    // Se clicar no item que já está selecionado, ele limpa (desmarca)
    const novoValor = atual[tipo] === valor ? '' : valor;
    
    this.selecionado.set({ ...atual, [tipo]: novoValor });
    this.menuAberto.set(null); // Fecha o menu após a seleção
    
    // Emite o evento para o componente inicio.ts realizar a filtragem real
    this.aoFiltrar.emit(this.selecionado());
  }
}