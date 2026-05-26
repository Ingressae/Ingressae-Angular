import { TipoFila } from '../enums/tipo-fila';

export interface Fila {
    usuarioId: string;
    showId: string;
    tipo: TipoFila;
    entradaEm: Date;
    posicao: number;
    tempoEsperaMinutos: number;
}