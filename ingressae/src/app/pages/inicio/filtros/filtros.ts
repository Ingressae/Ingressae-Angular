import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Show } from '../../../models/show';

// Importação da estrutura de ordenação estável ideal para listas pequenas
import { insertionSort } from '../../../shared/estruturas/insertion-sort';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtros.html',
  styleUrl: './filtros.scss',
})
export class Filtros {
  @Input() shows: Show[] = []; //
  @Output() filtrosChange = new EventEmitter<{ //
    termo: string; //
    localizacao: string; //
    genero: string; //
    mes: string; //
    ordenacao: 'data' | 'nome'; //
  }>(); //

  termoBusca = signal<string>(''); //
  filtroLocalizacao = signal<string>(''); //
  filtroGenero = signal<string>(''); //
  filtroMes = signal<string>(''); //
  ordenacao = signal<'data' | 'nome'>('data'); //

  temFiltrosAtivos = computed(() => { //
    return !!this.termoBusca() || !!this.filtroLocalizacao() || !!this.filtroGenero() || !!this.filtroMes(); //
  }); //

  estados = computed(() => { //
    const estadosSet = new Set<string>(); //
    this.shows.forEach(show => { //
      if (show.estado) estadosSet.add(show.estado); //
    }); //
    
    const listaEstados = Array.from(estadosSet); //
    return insertionSort(listaEstados, (a, b) => a.localeCompare(b));
  });

  generos = computed(() => { //
    const generosSet = new Set<string>(); //
    this.shows.forEach(show => { //
      if (show.genero) generosSet.add(show.genero); //
    }); //
    
    const listaGeneros = Array.from(generosSet); //
    return insertionSort(listaGeneros, (a, b) => a.localeCompare(b));
  });

  mesesDisponiveis = computed(() => { //
    const mesesSet = new Set<string>(); //
    this.shows.forEach(show => { //
      const data = new Date(show.dataEvento); //
      const mes = String(data.getMonth() + 1).padStart(2, '0'); //
      const ano = data.getFullYear(); //
      mesesSet.add(`${mes}/${ano}`); //
    }); //
    
    const listaMeses = Array.from(mesesSet); //
    return insertionSort(listaMeses, (a, b) => b.localeCompare(a));
  });

  constructor() { //
    this.emitirMudancas(); //
  } //

  ngOnChanges() { //
    this.emitirMudancas(); //
  } //

  private emitirMudancas() { //
    this.filtrosChange.emit({ //
      termo: this.termoBusca(), //
      localizacao: this.filtroLocalizacao(), //
      genero: this.filtroGenero(), //
      mes: this.filtroMes(), //
      ordenacao: this.ordenacao(), //
    }); //
  } //

  onFiltroChange() { //
    this.emitirMudancas(); //
  } //

  limparFiltros() { //
    this.termoBusca.set(''); //
    this.filtroLocalizacao.set(''); //
    this.filtroGenero.set(''); //
    this.filtroMes.set(''); //
    this.emitirMudancas(); //
  } //
}