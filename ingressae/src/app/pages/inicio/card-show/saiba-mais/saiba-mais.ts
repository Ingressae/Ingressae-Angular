import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Show } from '../../../../models/show'; // Ajuste o caminho se necessário

@Component({
  selector: 'app-saiba-mais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saiba-mais.html',
  styleUrls: ['./saiba-mais.scss']
})
export class SaibaMais {
  @Input({ required: true }) show!: Show;
  @Output() fechar = new EventEmitter<void>();

  // Formatação mais detalhada para a modal
  get dataFormatadaDetalhada(): string {
    return this.show.dataEvento.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  // Previne que o clique dentro da modal feche ela (event bubbling)
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}