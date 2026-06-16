import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-jogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jogo.html',
  styleUrl: './jogo.scss'
})
export class Jogo {

  torres: number[][] = [
    [4, 3, 2, 1],
    [],
    []
  ];

  torreSelecionada: number | null = null;

  movimentos = 0;

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

    if (this.torres[2].length === 4) {

      setTimeout(() => {

        alert(
          `🎉 Você venceu em ${this.movimentos} movimentos!`
        );

      }, 100);

    }

  }

  reiniciar(): void {

    this.torres = [
      [4, 3, 2, 1],
      [],
      []
    ];

    this.movimentos = 0;
    this.torreSelecionada = null;
  }

}