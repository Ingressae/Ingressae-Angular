export interface UsuarioFila {
  usuarioId: string;
  anosNaPlataforma: number;
  entradaEm: Date;
}

export class FilaPreferencial {
  private fila: UsuarioFila[] = [];

  entrar(usuario: UsuarioFila): void {
    let i = 0;

    // Quem tem mais anos entra na frente
    // Se tiver o mesmo tempo, respeita a ordem de chegada
    while (
      i < this.fila.length &&
      this.fila[i].anosNaPlataforma >= usuario.anosNaPlataforma
    ) {
      i++;
    }

    this.fila.splice(i, 0, usuario);
  }

  posicao(usuarioId: string): number {
    return this.fila.findIndex(u => u.usuarioId === usuarioId) + 1;
  }

  tamanho(): number {
    return this.fila.length;
  }

  proximo(): UsuarioFila | null {
    return this.fila[0] ?? null;
  }

  remover(): void {
    this.fila.shift();
  }
}