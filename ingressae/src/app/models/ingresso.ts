import { TipoIngresso } from '../enums/tipo-ingresso';
import { StatusIngresso } from '../enums/status-ingresso';

export interface Ingresso {
    id: string;
    showId: string;
    usuarioId: string;
    tipo: TipoIngresso;
    compradoEm: Date;
    status: StatusIngresso;
}