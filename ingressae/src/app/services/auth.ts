import { Injectable, signal, computed } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioAtual = signal<Usuario | null>({
    id: '1',
    nome: 'Fulano',
    email: 'fulano@gmail.com.com',
    idade: 23,
    fotoUrl: 'https://i.pravatar.cc/150?img=1',
    membroDesde: new Date('2020-01-01' ),
    anosNaPlataforma: 7,
    fasClubes: ['2', '1'], // Participa do fã-clube
    token: 'token-teste',
  });

  // Leitura do usuário logado (Somente Leitura)
  usuario = this.usuarioAtual.asReadonly();

  // Verifica se tem alguém logado
  estaLogado = computed(() => !!this.usuarioAtual());

  // Verifica se tem 5+ anos para fila preferencial
  elegivelFilaPreferencial = computed(() => (this.usuarioAtual()?.anosNaPlataforma ?? 0) >= 5);

  login(usuario: Usuario): void {
    this.usuarioAtual.set(usuario);
  }

  logout(): void {
    this.usuarioAtual.set(null);
  }

  participaDoFasClube(fasClubeId: string): boolean {
    const usuario = this.usuarioAtual();
    if (!usuario) {
      return false;
    }
    return usuario.fasClubes.includes(fasClubeId);
  }

  // NOVA FUNÇÃO CORRIGIDA: Valida o limite de 6
  atualizarInscricoes(novasInscricoes: string[]) {
    const usuario = this.usuarioAtual();
    
    if (!usuario) return;

    // Se a nova lista for maior que 6, bloqueia
    if (novasInscricoes.length > 6) {
      // Substitua pelo seu serviço de Toast real, ex: this.toast.warning('...');
      alert('Limite de 6 fã-clubes atingido!');
      return; 
    }

    // Atualiza o sinal PRIVADO (o que permite escrita)
    this.usuarioAtual.set({
      ...usuario,
      fasClubes: novasInscricoes
    });
  }

  adicionarAoFasClube(fasClubeId: string): void {
    this.usuarioAtual.update((usuario) => {
      if (!usuario) {
        return null;
      }

      // Validação extra aqui também para garantir o limite
      if (usuario.fasClubes.length >= 6) {
        alert('Você já atingiu o limite de 6 fã-clubes!');
        return usuario;
      }

      if (usuario.fasClubes.includes(fasClubeId)) {
        return usuario;
      }

      return {
        ...usuario,
        fasClubes: [...usuario.fasClubes, fasClubeId],
      };
    });
  }

  removerDoFasClube(fasClubeId: string): void {
    this.usuarioAtual.update((usuario) => {
      if (!usuario) {
        return null;
      }

      return {
        ...usuario,
        fasClubes: usuario.fasClubes.filter((id) => id !== fasClubeId),
      };
    });
  }
}
