import { Comentario } from './comentario';

export interface Postagem {
    id: string;
    fasClubeId: string;
    autorId: string;
    nomeAutor: string;
    fotoAutorUrl: string;
    anosMembroAutor: number;
    titulo: string;
    conteudo: string;
    imagensUrl: string[];
    criadoEm: Date;
    curtidas: number;
    comentarios: Comentario[];
}