import { Component } from '@angular/core';
import { Ingresso } from '../../models/ingresso';
import { Usuario } from '../../models/usuario';
import { CabecalhoPerfil } from './cabecalho-perfil/cabecalho-perfil';
import { ChipsFasClubes } from './chips-fas-clubes/chips-fas-clubes';
import { Historico } from './historico/historico';

@Component({
  selector: 'app-perfil',
  imports: [CabecalhoPerfil, ChipsFasClubes, Historico],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil {
  usuario: Usuario = {
    id: '1',
    nome: 'Maria Silva',
    email: 'maria@email.com',
    senha: 'senha',
    idade: 28,
    fotoUrl: '',
    membroDesde: new Date('2018-01-01'),
    anosNaPlataforma: 7,
    fasClubes: ['XO Family', 'Coldplayers BR', 'Swifties Brasil', 'Firebreathers'],
    token: '',
  };

  ingressos: Ingresso[] = [
    {
      id: '1',
      showId: 'Coldplay — Music Of The Spheres',
      usuarioId: '1',
      tipo: 'PREFERENCIAL' as any,
      compradoEm: new Date('2026-04-22'),
      status: 'CONFIRMADO' as any,
    },
    {
      id: '2',
      showId: 'Taylor Swift — Eras Tour',
      usuarioId: '1',
      tipo: 'NORMAL' as any,
      compradoEm: new Date('2026-03-10'),
      status: 'CONFIRMADO' as any,
    },
    {
      id: '3',
      showId: 'The Weeknd — After Hours',
      usuarioId: '1',
      tipo: 'PREFERENCIAL' as any,
      compradoEm: new Date('2026-06-15'),
      status: 'CONFIRMADO' as any,
    },
    {
      id: '4',
      showId: 'Imagine Dragons — Loom Tour',
      usuarioId: '1',
      tipo: 'NORMAL' as any,
      compradoEm: new Date('2025-11-20'),
      status: 'CONFIRMADO' as any,
    },
    {
      id: '5',
      showId: 'Dua Lipa — Radical Optimism',
      usuarioId: '1',
      tipo: 'NORMAL' as any,
      compradoEm: new Date('2025-09-05'),
      status: 'UTILIZADO' as any,
    },
    {
      id: '6',
      showId: 'Linkin Park — From Zero Tour',
      usuarioId: '1',
      tipo: 'PREFERENCIAL' as any,
      compradoEm: new Date('2025-08-18'),
      status: 'CANCELADO' as any,
    },
  ];
}
