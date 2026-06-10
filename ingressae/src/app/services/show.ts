import { Injectable, signal } from '@angular/core';
import { Show } from '../models/show';

@Injectable({
  providedIn: 'root'
})

export class ShowService {
  private shows = signal<Show[]>([
    {
      id: '1',
      nome: 'The Weeknd World Tour',
      artista: 'The Weeknd',
      local: 'Allianz Parque, São Paulo',
      dataEvento: new Date('2026-03-15'),
      imagemCapaUrl: '',
      dataFilaPreferencial: new Date('2026-01-10'),
      dataFilaNormal: new Date('2026-01-11'),
      fasClubeId: '1',
      descricao: 'A maior tour do The Weeknd pelo Brasil.'
    },
    {
      id: '2',
      nome: 'Coldplay Music Of The Spheres',
      artista: 'Coldplay',
      local: 'Estádio Nilton Santos, Rio de Janeiro',
      dataEvento: new Date('2026-04-22'),
      imagemCapaUrl: '',
      dataFilaPreferencial: new Date('2026-02-01'),
      dataFilaNormal: new Date('2026-02-02'),
      fasClubeId: '2',
      descricao: 'O espetáculo mais colorido do mundo chega ao Brasil.'
    },
    {
      id: '3',
      nome: 'Taylor Swift — Eras Tour',
      artista: 'Taylor Swift',
      local: 'MorumBIS, São Paulo',
      dataEvento: new Date('2026-05-10'),
      imagemCapaUrl: '',
      dataFilaPreferencial: new Date('2026-03-01'),
      dataFilaNormal: new Date('2026-03-02'),
      fasClubeId: '3',
      descricao: 'Uma viagem por todas as eras da carreira de Taylor Swift.'
    },
    {
      id: '4',
      nome: 'Imagine Dragons — Loom Tour',
      artista: 'Imagine Dragons',
      local: 'Jeunesse Arena, Rio de Janeiro',
      dataEvento: new Date('2026-06-18'),
      imagemCapaUrl: '',
      dataFilaPreferencial: new Date('2026-04-10'),
      dataFilaNormal: new Date('2026-04-11'),
      fasClubeId: '4',
      descricao: 'O novo álbum Loom ganha vida no palco.'
    },
    {
      id: '5',
      nome: 'Dua Lipa — Radical Optimism',
      artista: 'Dua Lipa',
      local: 'Arena BRB, Brasília',
      dataEvento: new Date('2026-07-05'),
      imagemCapaUrl: '',
      dataFilaPreferencial: new Date('2026-05-01'),
      dataFilaNormal: new Date('2026-05-02'),
      fasClubeId: '5',
      descricao: 'Dua Lipa apresenta seu novo show pelo Brasil.'
    },
    {
      id: '6',
      nome: 'Linkin Park — From Zero Tour',
      artista: 'Linkin Park',
      local: 'Allianz Parque, São Paulo',
      dataEvento: new Date('2026-08-20'),
      imagemCapaUrl: '',
      dataFilaPreferencial: new Date('2026-06-01'),
      dataFilaNormal: new Date('2026-06-02'),
      fasClubeId: '6',
      descricao: 'O retorno mais aguardado do rock mundial.'
    }
  ]);

  buscarTodos(): Show[] {
    return this.shows();
  }

  buscarPorId(id: string): Show | undefined {
    return this.shows().find(s => s.id === id);
  }
}