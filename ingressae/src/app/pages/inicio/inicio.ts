import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardShow, Show } from './card-show/card-show';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, CardShow],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.scss']
})
export class Inicio {
  shows: Show[] = [
    {
      id: 1,
      title: 'The Weeknd World Tour',
      date: '15 Mar 2026',
      location: 'Allianz Parque, São Paulo',
      gradientClass: 'grad-purple'
    },
    {
      id: 2,
      title: 'Coldplay — Music Of The Spheres',
      date: '22 Abr 2026',
      location: 'Estádio do Morumbi, SP',
      gradientClass: 'grad-blue'
    },
    {
      id: 3,
      title: 'Taylor Swift — Eras Tour Brasil',
      date: '10 Mai 2026',
      location: 'Engenhão, Rio de Janeiro',
      gradientClass: 'grad-orange'
    },
    {
      id: 4,
      title: 'Imagine Dragons Live',
      date: '02 Jun 2026',
      location: 'Arena MRV, Belo Horizonte',
      gradientClass: 'grad-cyan'
    },
    {
      id: 5,
      title: 'Dua Lipa — Future Nostalgia',
      date: '18 Jul 2026',
      location: 'Jeunesse Arena, RJ',
      gradientClass: 'grad-purple'
    },
    {
      id: 6,
      title: 'Falcão — Sucessão de Sucessos Que Se Sucedem Sucessivamente Sem Cessar',
      date: '05 Ago 2026',
      location: 'Allianz Parque, São Paulo',
      gradientClass: 'grad-purple' // Ajuste para o gradiente desejado
    }
  ];
}