export interface UsuarioFilaNormal {
  usuarioId: string;
  entradaEm: Date;
}

export class FilaNormal {
  private fila: UsuarioFilaNormal[] = [];

  entrar(usuario: UsuarioFilaNormal): void {
    this.fila.push(usuario);
  }

  posicao(usuarioId: string): number {
    return this.fila.findIndex(u => u.usuarioId === usuarioId) + 1;
  }

  tamanho(): number {
    return this.fila.length;
  }

  proximo(): UsuarioFilaNormal | null {
    return this.fila[0] ?? null;
  }

  remover(): void {
    this.fila.shift();
  }
}