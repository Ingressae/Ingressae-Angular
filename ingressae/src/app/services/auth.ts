import { Injectable, signal, computed } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private usuarioAtual = signal<Usuario | null>(null);

  // Leitura do usuário logado
  usuario = this.usuarioAtual.asReadonly();

  // Verifica se tem alguém logado
  estaLogado = computed(() => !!this.usuarioAtual());

  // Verifica se tem 5+ anos para fila preferencial
  elegivelFilaPreferencial = computed(() =>
    (this.usuarioAtual()?.anosNaPlataforma ?? 0) >= 5
  );

  login(usuario: Usuario): void {
    this.usuarioAtual.set(usuario);
  }

  logout(): void {
    this.usuarioAtual.set(null);
  }
}