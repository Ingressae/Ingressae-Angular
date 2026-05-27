import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Ingresso } from '../../../models/ingresso';
import { insertionSort } from '../../../shared/estruturas/insertion-sort';

@Component({
  selector: 'app-historico',
  imports: [CommonModule],
  templateUrl: './historico.html',
  styleUrl: './historico.scss',
})

export class Historico {

  @Input() ingressos: Ingresso[] = [];

  abaAtiva: 'proximos' | 'historico' = 'proximos';

  proximosOrdenados: Ingresso[] = [];
  historicoOrdenado: Ingresso[] = [];

  ngOnInit(): void {
    this.ordenarProximos();
    this.ordenarHistorico();
  }

  private ordenarProximos(): void {
    const confirmados = this.ingressos.filter(i => i.status === 'CONFIRMADO');

    // Ordena do show mais próximo ao mais distante pela data do show
    this.proximosOrdenados = insertionSort(confirmados, (a, b) =>
      new Date(a.compradoEm).getTime() - new Date(b.compradoEm).getTime()
    );
  }

  private ordenarHistorico(): void {
    const passados = this.ingressos.filter(i => i.status !== 'CONFIRMADO');

    // Ordena do evento mais recente ao mais antigo
    this.historicoOrdenado = insertionSort(passados, (a, b) =>
      new Date(b.compradoEm).getTime() - new Date(a.compradoEm).getTime()
    );
  }

  trocarAba(aba: 'proximos' | 'historico'): void {
    this.abaAtiva = aba;
  }

}
