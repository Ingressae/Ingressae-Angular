import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardShow, Show } from './card-show/card-show';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, CardShow],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.scss'],
})
export class Inicio {
  shows: Show[] = [
    {
      id: 1,
      title: 'The Weeknd World Tour',
      date: '15 Mar 2026',
      location: 'Allianz Parque, São Paulo',
      gradientClass: 'grad-purple',
      prefAvailable: true,
      normalAvailable: true,
    },
    {
      id: 2,
      title: 'Coldplay — Music Of The Spheres',
      date: '22 Abr 2026',
      location: 'Estádio do Morumbi, SP',
      gradientClass: 'grad-blue',
      prefAvailable: true,
      normalAvailable: false, // Indisponível
    },
    {
      id: 3,
      title: 'Taylor Swift — Eras Tour Brasil',
      date: '10 Mai 2026',
      location: 'Engenhão, Rio de Janeiro',
      gradientClass: 'grad-redPurple',
      prefAvailable: false,   // Indisponível
      normalAvailable: false, // Indisponível
    },
    {
      id: 4,
      title: 'Imagine Dragons Live',
      date: '02 Jun 2026',
      location: 'Arena MRV, Belo Horizonte',
      gradientClass: 'grad-cyan',
      prefAvailable: true,  
      normalAvailable: false, // Indisponível
    },
    {
      id: 5,
      title: 'Dua Lipa — Future Nostalgia',
      date: '18 Jul 2026',
      location: 'Jeunesse Arena, RJ',
      gradientClass: 'grad-purple',
      prefAvailable: true,
      normalAvailable: true,
    },
    {
      id: 6,
      title: 'Falcão — Lindo, Bonito e Joiado',
      date: '05 Ago 2026',
      location: 'Allianz Parque, São Paulo',
      gradientClass: 'grad-orange',
      prefAvailable: true,
      normalAvailable: true,
    },
  ];
}
