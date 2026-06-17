import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Ingresso } from '../../../models/ingresso';
import { insertionSort } from '../../../shared/estruturas/insertion-sort';
import { ShowService } from '../../../services/show';
import { TipoFilaPipe } from '../../../shared/pipes/tipo-fila-pipe';

@Component({
  selector: 'app-historico',
  imports: [CommonModule, DatePipe, TipoFilaPipe],
  templateUrl: './historico.html',
  styleUrl: './historico.scss',
})

export class Historico {

  @Input() ingressos: Ingresso[] = [];

  private showService = inject(ShowService);

  abaAtiva: 'proximos' | 'historico' = 'proximos';

  proximosOrdenados: Ingresso[] = [];
  historicoOrdenado: Ingresso[] = [];

  ngOnInit(): void {
    this.ordenarProximos();
    this.ordenarHistorico();
  }

  // Busca o nome do show pelo id, usado direto no HTML
  nomeShow(showId: string): string {
    return this.showService.buscarPorId(showId)?.nome ?? 'Show não encontrado';
  }

  private ordenarProximos(): void {
    const confirmados = this.ingressos.filter(i => i.status === 'CONFIRMADO');

    this.proximosOrdenados = insertionSort(confirmados, (a, b) =>
      new Date(a.compradoEm).getTime() - new Date(b.compradoEm).getTime()
    );
  }

  private ordenarHistorico(): void {
    const passados = this.ingressos.filter(i => i.status !== 'CONFIRMADO');

    this.historicoOrdenado = insertionSort(passados, (a, b) =>
      new Date(b.compradoEm).getTime() - new Date(a.compradoEm).getTime()
    );
  }

  trocarAba(aba: 'proximos' | 'historico'): void {
    this.abaAtiva = aba;
  }
}
