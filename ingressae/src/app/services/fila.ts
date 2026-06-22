import { Injectable, signal } from '@angular/core';

export interface UsuarioFilaPref {
  usuarioId: string;
  anosNaPlataforma: number;
  entradaEm: Date;
}

export interface UsuarioFilaNorm {
  usuarioId: string;
  entradaEm: Date;
}

@Injectable({
  providedIn: 'root',
})
export class FilaService {
  private preferencial = signal<UsuarioFilaPref[]>([]);
  private normal = signal<UsuarioFilaNorm[]>([]);

  // Preferencial
  entrarPreferencial(usuario: UsuarioFilaPref) {
    const fila = [...this.preferencial()];
    let i = 0;
    while (i < fila.length && fila[i].anosNaPlataforma >= usuario.anosNaPlataforma) i++;
    fila.splice(i, 0, usuario);
    this.preferencial.set(fila);
  }

  posicaoPreferencial(usuarioId: string): number {
    return this.preferencial().findIndex(u => u.usuarioId === usuarioId) + 1;
  }

  tamanhoPreferencial(): number {
    return this.preferencial().length;
  }

  proximoPreferencial() {
    return this.preferencial()[0] ?? null;
  }

  removerPreferencial() {
    const fila = [...this.preferencial()];
    fila.shift();
    this.preferencial.set(fila);
  }

  // Normal
  entrarNormal(usuario: UsuarioFilaNorm) {
    this.normal.update(lista => [...lista, usuario]);
  }

  posicaoNormal(usuarioId: string): number {
    return this.normal().findIndex(u => u.usuarioId === usuarioId) + 1;
  }

  tamanhoNormal(): number {
    return this.normal().length;
  }

  proximoNormal() {
    return this.normal()[0] ?? null;
  }

  removerNormal() {
    const fila = [...this.normal()];
    fila.shift();
    this.normal.set(fila);
  }

  // Helpers for demo data
  popularDemoPreferencial(usuarios: UsuarioFilaPref[]) {
    this.preferencial.set(usuarios.slice());
  }

  popularDemoNormal(usuarios: UsuarioFilaNorm[]) {
    this.normal.set(usuarios.slice());
  }
}
