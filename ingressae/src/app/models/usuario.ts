export interface Usuario {
    id: string;
    nome: string;
    email: string;
    idade: number;
    fotoUrl: string;
    membroDesde: Date;
    anosNaPlataforma: number;
    fasClubes: string[];
    token?: string;
}

