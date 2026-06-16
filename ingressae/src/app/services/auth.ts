import { Injectable, signal, computed } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarios: Usuario[] = [
    {
      id: '1',
      nome: 'Fulano',
      email: 'fulano@gmail.com',
      senha: '123456',
      idade: 23,
      fotoUrl: 'https://i.pravatar.cc/150?img=1',
      membroDesde: new Date('2020-01-01'),
      anosNaPlataforma: 6,
      fasClubes: ['1'],
      token: 'token-1',
    },

    {
      id: '2',
      nome: 'Maria',
      email: 'maria@gmail.com',
      senha: '123456',
      idade: 28,
      fotoUrl: 'https://i.pravatar.cc/150?img=2',
      membroDesde: new Date('2021-05-15'),
      anosNaPlataforma: 5,
      fasClubes: ['1', '2'],
      token: 'token-2',
    },

    {
      id: '3',
      nome: 'João',
      email: 'joao@gmail.com',
      senha: '123456',
      idade: 31,
      fotoUrl: 'https://i.pravatar.cc/150?img=3',
      membroDesde: new Date('2023-01-10'),
      anosNaPlataforma: 2,
      fasClubes: [],
      token: 'token-3',
    },
  ];

  private usuarioAtual = signal<Usuario | null>(null);
  // Leitura do usuário logado (Somente Leitura)
  usuario = this.usuarioAtual.asReadonly();

  estaLogado = computed(() => !!this.usuarioAtual());

  elegivelFilaPreferencial = computed(() => (this.usuarioAtual()?.anosNaPlataforma ?? 0) >= 5);

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
      fasClubes: novasInscricoes,
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

  autenticar(email: string, senha: string): boolean {
    const usuario = this.usuarios.find(
      (usuario) => usuario.email === email && usuario.senha === senha,
    );

    if (!usuario) {
      return false;
    }

    this.usuarioAtual.set(usuario);

    return true;
  }
}
