import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-jogo',
  imports: [CommonModule],
  templateUrl: './jogo.html',
  styleUrl: './jogo.scss',
})
export class Jogo {
  torres: number [][] = [
    [4,3,2,1],
    [],
    []
  ]

  torreSelecionada: number | null = null;
  
  movimentos = 0;

  selecionarTorre
}
