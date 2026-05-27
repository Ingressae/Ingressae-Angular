import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Ingresso } from '../../../models/ingresso';

@Component({
  selector: 'app-historico',
  imports: [CommonModule],
  templateUrl: './historico.html',
  styleUrl: './historico.scss',
})
export class Historico {

  @Input() ingressos: Ingresso[] = [];

  abaAtiva: 'proximos' | 'historico' = 'proximos';

  get proximosEventos(): Ingresso[] {
    return this.ingressos.filter(i => i.status === 'CONFIRMADO');
  }

  get historicoPassado(): Ingresso[] {
    return this.ingressos.filter(i => i.status !== 'CONFIRMADO');
  }

  trocarAba(aba: 'proximos' | 'historico'): void {
    this.abaAtiva = aba;
  }

}
