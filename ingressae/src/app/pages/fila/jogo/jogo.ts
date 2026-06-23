import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastService } from '../../../services/toast';
import { Pilha } from '../../../shared/estruturas/pilha';

@Component({
  selector: 'app-jogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jogo.html',
  styleUrl: './jogo.scss'
})
export class JogoComponent {

  dificuldade = 'facil';

  quantidadeDiscos = 4;

  torres: Pilha<number>[] = [];

  torreSelecionada: number | null = null;

  movimentos = 0;


  jogoFinalizado = false;

  constructor(
    private toast: ToastService
  ) {
    this.criarTorres();
  }

  criarTorres(): void {

    const torre1 = new Pilha<number>();
    const torre2 = new Pilha<number>();
    const torre3 = new Pilha<number>();

    for (
      let i = this.quantidadeDiscos;
      i >= 1;
      i--
    ) {

      torre1.empilhar(i);

    }

    this.torres = [
      torre1,
      torre2,
      torre3
    ];

  }

  alterarDificuldade(
    dificuldade: string
  ): void {

    this.dificuldade = dificuldade;

    switch (dificuldade) {

      case 'facil':
        this.quantidadeDiscos = 4;
        this.toast.aviso(
          'Dificuldade: Fácil'
        );
        break;

      case 'medio':
        this.quantidadeDiscos = 5;
        this.toast.aviso(
          'Dificuldade: Médio'
        );
        break;

      case 'dificil':
        this.quantidadeDiscos = 6;
        this.toast.aviso(
          'Dificuldade: Difícil'
        );
        break;

      case 'hardcore':
        this.quantidadeDiscos = 7;
        this.toast.aviso(
          'Dificuldade: Hardcore'
        );
        break;

    }

    this.reiniciar();

  }

  selecionarTorre(
    indice: number
  ): void {

    if (this.jogoFinalizado) {
      return;
    }

    if (
      this.torreSelecionada === null
    ) {

      if (
        this.torres[indice].vazia()
      ) {
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

  moverDisco(
    origem: number,
    destino: number
  ): void {

    if (origem === destino) {
      return;
    }

    const torreOrigem =
      this.torres[origem];

    const torreDestino =
      this.torres[destino];

    if (
      torreOrigem.vazia()
    ) {
      return;
    }

    const disco =
      torreOrigem.topo();

    const topoDestino =
      torreDestino.topo();

    if (
      topoDestino !== undefined &&
      disco !== undefined &&
      topoDestino < disco
    ) {

      this.toast.aviso(
        'Não é permitido colocar um disco maior sobre um menor.'
      );

      return;
    }

    const discoMovido =
      torreOrigem.desempilhar();

    if (
      discoMovido !== undefined
    ) {

      torreDestino.empilhar(
        discoMovido
      );

    }

    this.movimentos++;

    this.verificarVitoria();

  }

  verificarVitoria(): void {

    if (
      this.torres[2].tamanho() ===
      this.quantidadeDiscos
    ) {

      this.jogoFinalizado = true;

      const minimo =
        Math.pow(
          2,
          this.quantidadeDiscos
        ) - 1;

      if (
        this.movimentos === minimo
      ) {

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

    this.jogoFinalizado = false;

    this.toast.aviso(
      'Jogo reiniciado.'
    );

  }

}