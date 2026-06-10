import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Jogo } from './jogo/jogo';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FilaPreferencial } from '../../shared/estruturas/fila-preferencial';
import { FilaNormal } from '../../shared/estruturas/fila-normal';
import { ShowService } from '../../services/show';
import { Show } from '../../models/show';

@Component({
  selector: 'app-fila',
  imports: [CommonModule, Jogo, RouterLink],
  templateUrl: './fila.html',
  styleUrl: './fila.scss',
})

export class Fila implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private showService = inject(ShowService);

  show: Show | undefined;
  tipo = '';

  posicaoAtual = 0;
  posicaoInicial = 0;
  progresso = 0;
  mostrarModal = false;

  private interval: any;
  private filaPreferencial = new FilaPreferencial();
  private filaNormal = new FilaNormal();

  get isPreferencial(): boolean {
    return this.tipo === 'preferencial';
  }

  get limiteIngressos(): number {
    return this.isPreferencial ? 1 : 2;
  }

  get tempoEstimado(): number {
    return Math.ceil(this.posicaoAtual * 0.01);
  }

  get dataFormatada(): string {
    if (!this.show) return '';
    return this.show.dataEvento.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  ngOnInit(): void {
    const showId = this.route.snapshot.paramMap.get('showId') ?? '';
    this.tipo = this.route.snapshot.paramMap.get('tipo') ?? 'normal';

    console.log('showId:', showId);
    console.log('tipo:', this.tipo);
    console.log('isPreferencial:', this.isPreferencial);

    this.show = this.showService.buscarPorId(showId);
    this.iniciarFila();
    this.iniciarContagem();
  }

  private iniciarFila(): void {
    if (this.isPreferencial) {
      this.filaPreferencial.entrar({ usuarioId: 'u1', anosNaPlataforma: 9, entradaEm: new Date() });
      this.filaPreferencial.entrar({ usuarioId: 'u2', anosNaPlataforma: 8, entradaEm: new Date() });
      this.filaPreferencial.entrar({ usuarioId: 'u3', anosNaPlataforma: 7, entradaEm: new Date() });
      this.filaPreferencial.entrar({ usuarioId: 'u4', anosNaPlataforma: 6, entradaEm: new Date() });
      this.filaPreferencial.entrar({ usuarioId: 'atual', anosNaPlataforma: 7, entradaEm: new Date() });

      this.posicaoInicial = Math.floor(this.filaPreferencial.tamanho() / 2);
      this.posicaoAtual = this.posicaoInicial;
    } else {
      for (let i = 1; i <= 3400; i++) {
        this.filaNormal.entrar({ usuarioId: `u${i}`, entradaEm: new Date() });
      }
      this.filaNormal.entrar({ usuarioId: 'atual', entradaEm: new Date() });
      this.posicaoInicial = this.filaNormal.posicao('atual');
      this.posicaoAtual = this.posicaoInicial;
    }

    this.atualizarProgresso();
  }

  private iniciarContagem(): void {
    this.interval = setInterval(() => {
      console.log('posicao atual:', this.posicaoAtual);
      console.log('navegando para:', '/compra', this.show?.id, this.tipo);

      if (this.posicaoAtual > 1) {
        this.posicaoAtual--;
        this.atualizarProgresso();
      } else {
        clearInterval(this.interval);
        this.router.navigate(['/compra', this.show?.id, this.tipo]);
      }
    }, 10000);
  }

  private atualizarProgresso(): void {
    const percentual = ((this.posicaoInicial - this.posicaoAtual) / this.posicaoInicial) * 100;
    this.progresso = this.isPreferencial
      ? Math.max(50, percentual)
      : percentual;
  }

  abrirModal(): void {
    this.mostrarModal = true;
  }

  fecharModal(): void {
    this.mostrarModal = false;
  }

  confirmarSaida(): void {
    clearInterval(this.interval);
    this.router.navigate(['/inicio']);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}