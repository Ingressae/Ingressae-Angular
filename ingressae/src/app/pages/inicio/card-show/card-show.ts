import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Show } from '../../../models/show';

@Component({
  selector: 'app-card-show',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card-show.html',
  styleUrls: ['./card-show.scss']
})
export class CardShow {
  @Input({ required: true }) show!: Show;
  @Output() abrirModal = new EventEmitter<Show>();

  // Emite o evento passando as informações do show clicado para o componente Pai (inicio)
  dispararModal() {
    this.abrirModal.emit(this.show);
  }

  // Lista de gradientes para alternar visualmente entre os cards
  private gradientes = ['grad-purple', 'grad-blue', 'grad-redPurple', 'grad-cyan', 'grad-orange'];

  get gradientClass(): string {
    const indice = parseInt(this.show.id, 10) % this.gradientes.length;
    return this.gradientes[indice];
  }

  get dataFormatada(): string {
    return this.show.dataEvento.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  get prefAvailable(): boolean {
    return new Date() >= this.show.dataFilaPreferencial;
  }

  get normalAvailable(): boolean {
    return new Date() >= this.show.dataFilaNormal;
  }
}