import { Component, Input, Output, EventEmitter, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Show } from '../../../models/show';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtros.html',
  styleUrl: './filtros.scss',
})
export class Filtros {
  @Input() shows: Show[] = [];
  @Output() filtrosChange = new EventEmitter<{
    termo: string;
    localizacao: string;
    genero: string;
    mes: string;
    ordenacao: 'data' | 'nome';
  }>();

  termoBusca = signal<string>('');
  filtroLocalizacao = signal<string>('');
  filtroGenero = signal<string>('');
  filtroMes = signal<string>('');
  ordenacao = signal<'data' | 'nome'>('data');

  temFiltrosAtivos = computed(() => {
    return !!this.termoBusca() || !!this.filtroLocalizacao() || !!this.filtroGenero() || !!this.filtroMes();
  });

  estados = computed(() => {
    const estadosSet = new Set<string>();
    this.shows.forEach(show => {
      if (show.estado) estadosSet.add(show.estado);
    });
    return Array.from(estadosSet).sort();
  });

  generos = computed(() => {
    const generosSet = new Set<string>();
    this.shows.forEach(show => {
      if (show.genero) generosSet.add(show.genero);
    });
    return Array.from(generosSet).sort();
  });

  mesesDisponiveis = computed(() => {
    const mesesSet = new Set<string>();
    this.shows.forEach(show => {
      const data = new Date(show.dataEvento);
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      mesesSet.add(`${mes}/${ano}`);
    });
    return Array.from(mesesSet).sort().reverse();
  });

  constructor() {
    this.emitirMudancas();
  }

  ngOnChanges() {
    this.emitirMudancas();
  }

  private emitirMudancas() {
    this.filtrosChange.emit({
      termo: this.termoBusca(),
      localizacao: this.filtroLocalizacao(),
      genero: this.filtroGenero(),
      mes: this.filtroMes(),
      ordenacao: this.ordenacao(),
    });
  }

  onFiltroChange() {
    this.emitirMudancas();
  }

  limparFiltros() {
    this.termoBusca.set('');
    this.filtroLocalizacao.set('');
    this.filtroGenero.set('');
    this.filtroMes.set('');
    this.emitirMudancas();
  }
}
