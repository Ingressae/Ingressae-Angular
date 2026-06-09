import { Injectable } from '@angular/core';
import { Comentario } from '../models/comentario';

@Injectable({
  providedIn: 'root',
})
export class FasClube {
  private comentarios: Comentario[] = [
    {
      id: '1',
      autorId: '101',
      nomeAutor: 'João Silva',
      fotoAutorUrl: 'https://i.pravatar.cc/150?img=1',
      conteudo: 'Ótimo conteúdo! Me ajudou bastante.',
      criadoEm: new Date(), // hoje
    },
    {
      id: '2',
      autorId: '102',
      nomeAutor: 'Maria Oliveira',
      fotoAutorUrl: 'https://i.pravatar.cc/150?img=2',
      conteudo: 'Tenho uma dúvida sobre a implementação.',
      criadoEm: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
    },
    {
      id: '3',
      autorId: '103',
      nomeAutor: 'Carlos Santos',
      fotoAutorUrl: 'https://i.pravatar.cc/150?img=3',
      conteudo: 'Funcionou perfeitamente aqui.',
      criadoEm: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 dias atrás
    },
    {
      id: '4',
      autorId: '104',
      nomeAutor: 'Ana Costa',
      fotoAutorUrl: 'https://i.pravatar.cc/150?img=4',
      conteudo: 'Muito interessante. Vou testar no meu projeto.',
      criadoEm: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 dias atrás
    },
    {
      id: '5',
      autorId: '105',
      nomeAutor: 'Pedro Almeida',
      fotoAutorUrl: 'https://i.pravatar.cc/150?img=5',
      conteudo: 'Excelente explicação, clara e objetiva.',
      criadoEm: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 dias atrás
    },
  ];

  getComentarios(): Comentario[] {
    return this.comentarios;
  }
}
