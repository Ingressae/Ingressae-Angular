import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastService } from '../../../services/toast';

@Component({
  selector: 'app-jogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jogo.html',
  styleUrl: './jogo.scss'
})
export class Jogo {

  dificuldade = 'facil';

  quantidadeDiscos = 4;

  torres: number[][] = [];

  torreSelecionada: number | null = null;

  movimentos = 0;

  constructor(
    private toast: ToastService
  ) {
    this.criarTorres();
  }

  criarTorres(): void {

    this.torres = [
      Array.from(
        { length: this.quantidadeDiscos },
        (_, i) => this.quantidadeDiscos - i
      ),
      [],
      []
    ];

  }

  alterarDificuldade(dificuldade: string): void {

    this.dificuldade = dificuldade;

    switch (dificuldade) {

      case 'facil':
        this.quantidadeDiscos = 4;
        this.toast.aviso('Dificuldade: Fácil');
        break;

      case 'medio':
        this.quantidadeDiscos = 5;
        this.toast.aviso('Dificuldade: Médio');
        break;

      case 'dificil':
        this.quantidadeDiscos = 6;
        this.toast.aviso('Dificuldade: Difícil');
        break;

      case 'hardcore':
        this.quantidadeDiscos = 7;
        this.toast.aviso('Dificuldade: Hardcore');
        break;

    }

    this.reiniciar();

  }

  selecionarTorre(indice: number): void {

    if (this.torreSelecionada === null) {

      if (this.torres[indice].length === 0) {
        return;
      }

      this.torreSelecionada = indice;
      return;
    }

    this.moverDisco(
      this.torreSelecionada,
      indice
    );

    this.torreSelecionada = null;
  }

  moverDisco(origem: number, destino: number): void {

    if (origem === destino) {
      return;
    }

    const torreOrigem = this.torres[origem];
    const torreDestino = this.torres[destino];

    if (torreOrigem.length === 0) {
      return;
    }

    const disco =
      torreOrigem[torreOrigem.length - 1];

    const topoDestino =
      torreDestino[torreDestino.length - 1];

    if (
      topoDestino !== undefined &&
      topoDestino < disco
    ) {
      return;
    }

    torreOrigem.pop();
    torreDestino.push(disco);

    this.movimentos++;

    this.verificarVitoria();
  }

  verificarVitoria(): void {

    if (
      this.torres[2].length === this.quantidadeDiscos
    ) {

      const minimo =
        Math.pow(2, this.quantidadeDiscos) - 1;

      if (this.movimentos === minimo) {

        this.toast.sucesso(
          `🏆 Solução perfeita! ${this.movimentos} movimentos.`
        );

      } else {

        this.toast.sucesso(
          `🎉 Você venceu em ${this.movimentos} movimentos!`
        );

      }

    }

  }

  reiniciar(): void {

    this.criarTorres();

    this.movimentos = 0;

    this.torreSelecionada = null;

  }

}