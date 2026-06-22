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
      showId: '1',
      usuarioId: '2',
      tipo: TipoIngresso.PREFERENCIAL,
      compradoEm: new Date('2026-09-15'),
      status: StatusIngresso.CONFIRMADO,
    },
    {
      id: '2',
      showId: '3',
      usuarioId: '1',
      tipo: TipoIngresso.NORMAL,
      compradoEm: new Date('2026-10-22'),
      status: StatusIngresso.CONFIRMADO,
    },
    {
      id: '3',
      showId: '4',
      usuarioId: '1',
      tipo: TipoIngresso.PREFERENCIAL,
      compradoEm: new Date('2026-07-18'),
      status: StatusIngresso.CONFIRMADO,
    },
    {
      id: '4',
      showId: '2',
      usuarioId: '1',
      tipo: TipoIngresso.NORMAL,
      compradoEm: new Date('2025-11-20'),
      status: StatusIngresso.UTILIZADO,
    },
    {
      id: '5',
      showId: '5',
      usuarioId: '1',
      tipo: TipoIngresso.NORMAL,
      compradoEm: new Date('2025-09-05'),
      status: StatusIngresso.UTILIZADO,
    },
    {
      id: '6',
      showId: '6',
      usuarioId: '1',
      tipo: TipoIngresso.PREFERENCIAL,
      compradoEm: new Date('2025-08-18'),
      status: StatusIngresso.CANCELADO,
    }
  ]);

  // Retorna todos os ingressos
  buscarTodos() {
    return this.ingressos.asReadonly();
  }

  // Retorna apenas os ingressos do usuário logado
  buscarPorUsuario(usuarioId: string): Ingresso[] {
    return this.ingressos().filter(i => i.usuarioId === usuarioId);
  }

  // Adiciona um novo ingresso
  adicionar(novoIngresso: Ingresso): void {
    this.ingressos.update(lista => [...lista, novoIngresso]);
  }
}