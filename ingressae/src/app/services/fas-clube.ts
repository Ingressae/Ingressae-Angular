import { Injectable, signal } from '@angular/core';
import { Comentario } from '../models/comentario';
import { FasClube } from '../models/fas-clube';

@Injectable({
  providedIn: 'root',
})
export class FasClubeService {
  private clubes = signal<FasClube[]>([
    {
      id: '1',
      nome: 'Armys',
      nomeArtista: 'BTS',
      imagemCapaUrl: '',
      bannerGradient: 'linear-gradient(135deg, rgba(53, 0, 122, 0.95), rgba(56, 32, 66, 0.85))',
      totalMembros: 524585,
      showId: '1',
    },
    {
      id: '2',
      nome: 'Once',
      nomeArtista: 'Twice',
      imagemCapaUrl: '',
      bannerGradient: 'linear-gradient(135deg, rgba(242, 122, 153, 0.95), rgba(255, 218, 200, 0.85))',
      totalMembros: 814521,
      showId: '2',
    },
    {
      id: '3',
      nome: 'Maiden Maniacs',
      nomeArtista: 'Iron Maiden',
      imagemCapaUrl: '',
      bannerGradient: 'linear-gradient(135deg, rgba(26, 26, 68, 0.95), rgba(103, 11, 11, 0.85))',
      totalMembros: 268301,
      showId: '3',
    },
    {
      id: '4',
      nome: 'Coldplayers BR',
      nomeArtista: 'Coldplay',
      imagemCapaUrl: '',
      bannerGradient: 'linear-gradient(135deg, rgba(28, 133, 243, 0.95), rgba(129, 201, 242, 0.85))',
      totalMembros: 561272,
      showId: '4',
    },
    {
      id: '5',
      nome: 'Falcãonaticos',
      nomeArtista: 'Falcão',
      imagemCapaUrl: '',
      bannerGradient: 'linear-gradient(135deg, rgba(251, 161, 37, 0.95), rgba(255, 221, 146, 0.85))',
      totalMembros: 561272,
      showId: '5',
    },
    {
      id: '6',
      nome: 'Swifties Brasil',
      nomeArtista: 'Taylor Swift',
      imagemCapaUrl: '',
      bannerGradient: 'linear-gradient(135deg, rgba(255, 135, 178, 0.95), rgba(147, 51, 153, 0.85))',
      totalMembros: 268301,
      showId: '6',
    },
  ]);

  buscarTodos() {
    return this.clubes.asReadonly();
  }

  buscarPorId(id: string): FasClube | undefined {
    return this.clubes().find((c) => c.id === id);
  }

  adicionarMembro(clubeId: string): void {
    this.clubes.update((clubes) =>
      clubes.map((clube) =>
        clube.id === clubeId
          ? { ...clube, totalMembros: clube.totalMembros + 1 }
          : clube,
      ),
    );
  }

  removerMembro(clubeId: string): void {
    this.clubes.update((clubes) =>
      clubes.map((clube) =>
        clube.id === clubeId
          ? { ...clube, totalMembros: Math.max(clube.totalMembros - 1, 0) }
          : clube,
      ),
    );
  }

  private comentarios: Comentario[] = [
    {
      id: '1',
      autorId: '101',
      nomeAutor: 'João Silva',
      fotoAutorUrl: 'https://i.pravatar.cc/150?img=1',
      conteudo:
        'Essa foi uma das melhores apresentações que já vi! *Energia incrível* do começo ao fim.',
      criadoEm: new Date(),
      qtdlike: 87,
    },
    {
      id: '2',
      autorId: '102',
      nomeAutor: 'Maria Oliveira',
      fotoAutorUrl: 'https://i.pravatar.cc/150?img=2',
      conteudo:
        'Alguém sabe qual foi a música tocada logo após _Midnight Lights_? Não consigo tirar ela da cabeça.',
      criadoEm: new Date(Date.now() - 1000 * 60 * 60 * 24),
      qtdlike: 24,
    },
    {
      id: '3',
      autorId: '103',
      nomeAutor: 'Carlos Santos',
      fotoAutorUrl: 'https://i.pravatar.cc/150?img=3',
      conteudo:
        'A iluminação do palco estava simplesmente *perfeita*. Combinou muito com o clima do show.',
      criadoEm: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      qtdlike: 156,
    },
    {
      id: '4',
      autorId: '104',
      nomeAutor: 'Ana Costa',
      fotoAutorUrl: 'https://i.pravatar.cc/150?img=4',
      conteudo: 'Primeira vez que fui a um show deles.\n\nPosso dizer que virei fã oficialmente ❤️',
      criadoEm: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      qtdlike: 312,
    },
    {
      id: '5',
      autorId: '105',
      nomeAutor: 'Pedro Almeida',
      fotoAutorUrl: 'https://i.pravatar.cc/150?img=5',
      conteudo: '~~Achei que o repertório seria fraco~~ mas fui surpreendido. *Show espetacular*!',
      criadoEm: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
      qtdlike: 421,
    },
    {
      id: '6',
      autorId: '106',
      nomeAutor: 'Fernanda Lima',
      fotoAutorUrl: 'https://i.pravatar.cc/150?img=6',
      conteudo:
        'Não acredito que finalmente tocaram `Forever Together` ao vivo. Esperei anos por isso!',
      criadoEm: new Date(Date.now() - 1000 * 60 * 60 * 6),
      qtdlike: 95,
    },
    {
      id: '7',
      autorId: '107',
      nomeAutor: 'Lucas Rocha',
      fotoAutorUrl: 'https://i.pravatar.cc/150?img=7',
      conteudo:
        'A interação da banda com o público foi *sensacional*. Dá para sentir o carinho pelos fãs.',
      criadoEm: new Date(Date.now() - 1000 * 60 * 60 * 12),
      qtdlike: 203,
    },
  ];

  getComentarios(): Comentario[] {
    return this.comentarios;
  }

  adicionarComentario(comentario: Comentario): void {
    this.comentarios.unshift(comentario);
  }
}
