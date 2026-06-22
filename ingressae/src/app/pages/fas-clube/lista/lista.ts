import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { FasClube as FasClubeModel } from '../../../models/fas-clube';
import { AuthService } from '../../../services/auth';
import { ToastService } from '../../../services/toast';
import { BuscaSequencial } from '../../../shared/estruturas/busca-sequencial';
import { CardPostagem } from '../card-postagem/card-postagem';
import { EstadoVazio } from '../../../shared/estado-vazio/estado-vazio';
import { FasClubeService } from '../../../services/fas-clube';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, CardPostagem, EstadoVazio],
  templateUrl: './lista.html',
  styleUrl: './lista.scss',
})
export class Lista {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private fasClubeService = inject(FasClubeService);

  fasClubes = this.fasClubeService.buscarTodos();

  termoBusca = signal('');
  carregando = signal(false);

  usuarioAtual = computed(() => this.authService.usuario());

  fasClubesDoUsuario = computed(() => this.usuarioAtual()?.fasClubes ?? []);

  quantidadeInscricoes = computed(() => this.fasClubesDoUsuario().length);

  atingiuLimiteInscricoes = computed(() => this.quantidadeInscricoes() >= 5);

fasClubesFiltrados = computed(() => {
  return BuscaSequencial.filtrar(
    this.fasClubes(),
    this.termoBusca(),
    ['nome', 'nomeArtista']
  );
});

  temResultados = computed(() => this.fasClubesFiltrados().length > 0);

  isMembro(clubeId: string): boolean {
    return this.fasClubesDoUsuario().includes(clubeId);
  }

  entrarClube(clube: FasClubeModel): void {
    const usuario = this.usuarioAtual();

    if (!usuario) {
      return;
    }

    const inscricoesAtuais = [...usuario.fasClubes];

    if (inscricoesAtuais.includes(clube.id)) {
      return;
    }

    if (inscricoesAtuais.length >= 5) {
      this.toastService.erro('Limite de 5 fã-clubes atingido!');
      return;
    }

    inscricoesAtuais.push(clube.id);

    this.authService.atualizarInscricoes(inscricoesAtuais);
    this.fasClubeService.adicionarMembro(clube.id);

    this.toastService.sucesso(`Você entrou no fã-clube ${clube.nome}!`);
  }

  sairClube(clube: FasClubeModel): void {
    const usuario = this.usuarioAtual();

    if (!usuario) {
      return;
    }

    this.authService.removerDoFasClube(clube.id);
    this.fasClubeService.removerMembro(clube.id);

    this.toastService.sucesso(`Você saiu do fã-clube ${clube.nome}.`);
  }

  verClube(clube: FasClubeModel): void {
    this.router.navigate(['/feed', clube.id]);
    console.log(clube.id);
  }
}
