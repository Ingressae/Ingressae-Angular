import { Injectable, signal } from '@angular/core';
import { Show } from '../models/show';

@Injectable({
  providedIn: 'root'
})

export class ShowService {
  private shows = signal<Show[]>([
    {
      id: '1',
      nome: 'Eclipse of the Soul',
      artista: 'BTS',
      local: 'Allianz Parque, São Paulo',
      dataEvento: new Date('2026-09-15'),
      imagemCapaUrl: '',
      dataFilaPreferencial: new Date('2026-06-10'), // já passou - disponível
      dataFilaNormal: new Date('2026-06-11'),       // já passou - disponível
      fasClubeId: '1',
      descricao: 'Uma jornada intensa entre luz e sombra, onde cada música revela emoções profundas, superação e conexão com o ARMY em um espetáculo cheio de energia, coreografias marcantes e visuais cinematográficos.'
    },
    {
      id: '2',
      nome: 'Blooming Hearts',
      artista: 'Twice',
      local: 'Estádio Nilton Santos, Rio de Janeiro',
      dataEvento: new Date('2026-10-22'),
      imagemCapaUrl: '',
      dataFilaPreferencial: new Date('2026-07-01'), // futuro - indisponível
      dataFilaNormal: new Date('2026-07-02'),       // futuro - indisponível
      fasClubeId: '2',
      descricao: 'Um show vibrante e encantador que mistura carisma, alegria e performances inesquecíveis. Uma celebração do amor, amizade e da evolução do grupo em um universo colorido e cheio de brilho.'
    },
    {
      id: '3',
      nome: 'Legacy of the Beast: Infernal Reign',
      artista: 'Iron Maiden',
      local: 'MorumBIS, São Paulo',
      dataEvento: new Date('2026-11-10'),
      imagemCapaUrl: '',
      dataFilaPreferencial: new Date('2026-08-01'), // futuro - indisponível
      dataFilaNormal: new Date('2026-08-02'),       // futuro - indisponível
      fasClubeId: '3',
      descricao: 'Uma experiência épica e sombria, trazendo o peso do heavy metal com cenários grandiosos, riffs lendários e a presença icônica de Eddie em uma batalha entre caos e eternidade.'
    },
    {
      id: '4',
      nome: 'Starlight Symphony',
      artista: 'Coldplay',
      local: 'Jeunesse Arena, Rio de Janeiro',
      dataEvento: new Date('2026-07-18'),
      imagemCapaUrl: '',
      dataFilaPreferencial: new Date('2026-06-05'), // já passou - disponível
      dataFilaNormal: new Date('2026-07-10'),       // futuro - indisponível (só pref aberta)
      fasClubeId: '4',
      descricao: 'Uma viagem emocional por sonhos, esperança e conexão humana. Luzes, cores e músicas que transformam o estádio em um universo vivo, criando momentos únicos entre banda e público.'
    },
    {
      id: '5',
      nome: 'Humor & Hits',
      artista: 'Falcão',
      local: 'Arena BRB, Brasília',
      dataEvento: new Date('2026-08-05'),
      imagemCapaUrl: '',
      dataFilaPreferencial: new Date('2026-06-01'), // já passou - disponível
      dataFilaNormal: new Date('2026-06-02'),       // já passou - disponível
      fasClubeId: '5',
      descricao: 'Um espetáculo irreverente que mistura música, humor e crítica social com o estilo único de Falcão. Uma noite leve, divertida e cheia de clássicos que arrancam risadas e nostalgia.'
    },
    {
      id: '6',
      nome: 'The Chapters Tour',
      artista: 'Taylor Swift',
      local: 'Allianz Parque, São Paulo',
      dataEvento: new Date('2026-12-20'),
      imagemCapaUrl: '',
      dataFilaPreferencial: new Date('2026-09-01'), // futuro - indisponível
      dataFilaNormal: new Date('2026-09-02'),       // futuro - indisponível
      fasClubeId: '6',
      descricao: 'Uma narrativa musical que atravessa diferentes fases, emoções e histórias. Cada ato representa um capítulo da carreira de Taylor, unindo nostalgia, romance, dor e renascimento em um espetáculo imersivo.'
    }
  ]);

  buscarTodos(): Show[] {
    return this.shows();
  }

  buscarPorId(id: string): Show | undefined {
    return this.shows().find(s => s.id === id);
  }
}