import { Injectable, signal } from '@angular/core';
import { StatusIngresso } from '../enums/status-ingresso';
import { TipoIngresso } from '../enums/tipo-ingresso';
import { Ingresso } from '../models/ingresso';

@Injectable({
  providedIn: 'root',
})

export class IngressoService {


  private ingressos = signal<Ingresso[]>([
    {
      id: '1',
      showId: '1', // The Weeknd World Tour
      usuarioId: '1',
      tipo: TipoIngresso.PREFERENCIAL,
      compradoEm: new Date('2026-03-15'),
      status: StatusIngresso.CONFIRMADO,
    },
    {
      id: '2',
      showId: '3', // Taylor Swift — Eras Tour
      usuarioId: '1',
      tipo: TipoIngresso.NORMAL,
      compradoEm: new Date('2026-05-10'),
      status: StatusIngresso.CONFIRMADO,
    },
    {
      id: '3',
      showId: '2', // Coldplay Music Of The Spheres
      usuarioId: '1',
      tipo: TipoIngresso.PREFERENCIAL,
      compradoEm: new Date('2026-04-22'),
      status: StatusIngresso.CONFIRMADO,
    },
    {
      id: '4',
      showId: '4', // Imagine Dragons — Loom Tour
      usuarioId: '1',
      tipo: TipoIngresso.NORMAL,
      compradoEm: new Date('2025-11-20'),
      status: StatusIngresso.UTILIZADO,
    },
    {
      id: '5',
      showId: '5', // Dua Lipa — Radical Optimism
      usuarioId: '1',
      tipo: TipoIngresso.NORMAL,
      compradoEm: new Date('2025-09-05'),
      status: StatusIngresso.UTILIZADO,
    },
    {
      id: '6',
      showId: '6', // Linkin Park — From Zero Tour
      usuarioId: '1',
      tipo: TipoIngresso.PREFERENCIAL,
      compradoEm: new Date('2025-08-18'),
      status: StatusIngresso.CANCELADO,
    }
  ]);

  buscarTodos() {
    return this.ingressos.asReadonly();
  }

  adicionar(novoIngresso: Ingresso): void {
    this.ingressos.update(lista => [...lista, novoIngresso]);
  }
}