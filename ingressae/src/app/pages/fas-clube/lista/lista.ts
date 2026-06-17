import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FasClube as FasClubeModel } from '../../../models/fas-clube';
import { AuthService } from '../../../services/auth';
import { ToastService } from '../../../services/toast';
import { EstadoVazio } from '../../../shared/estado-vazio/estado-vazio';
import { BuscaSequencial } from '../../../shared/estruturas/busca-sequencial';
import { CardPostagem } from '../card-postagem/card-postagem';
import { FasClubeService } from '../../../services/fas-clube';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, EstadoVazio, CardPostagem],
  templateUrl: './lista.html',
  styleUrl: './lista.scss',
})
export class Lista{

  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private fasClubeService = inject(FasClubeService);

  fasClubes = this.fasClubeService.buscarTodos();

  termoBusca = signal(''); carregando = signal(false);

  usuarioAtual = computed(() => this.authService.usuario());

  fasClubesDoUsuario = computed(() => { return this.usuarioAtual()?.fasClubes ?? []; });

  quantidadeInscricoes = computed(() => this.fasClubesDoUsuario().length);

  atingiuLimiteInscricoes = computed(() => this.quantidadeInscricoes() >= 6);

  fasClubesFiltrados = computed(() => {
    const termo = this.termoBusca();

    if (!termo) {
      return this.fasClubes();
    }

    const porArtista = BuscaSequencial.filtrar(
      this.fasClubes(),
      termo,
      'nomeArtista'
    );

    const porNome = BuscaSequencial.filtrar(
      this.fasClubes(),
      termo,
      'nome'
    );

    const todos = [...porArtista];

    porNome.forEach((clube: FasClubeModel) => {
      if (!todos.some(c => c.id === clube.id)) {
        todos.push(clube);
      }
    });

    return todos;

  });

  temResultados = computed(() => this.fasClubesFiltrados().length > 0);

  isMembro(clubeId: string): boolean { return this.fasClubesDoUsuario().includes(clubeId); }

  entrarClube(clube: FasClubeModel): void {
    const usuario = this.usuarioAtual();

  carregarFasClubes(): void {
      this.fasClubes.set([
        { id: '1', nome: 'XO Family', nomeArtista: 'The Weeknd', imagemCapaUrl: '', totalMembros: 524585, showId: 's1' },
        { id: '2', nome: 'Coldplayers BR', nomeArtista: 'Coldplay', imagemCapaUrl: 'coldplay.jpg', totalMembros: 814521, showId: 's2' },
        { id: '3', nome: 'Swifties Brasil', nomeArtista: 'Taylor Swift', imagemCapaUrl: '', totalMembros: 268301, showId: 's3' },
        { id: '4', nome: 'ARMYS', nomeArtista: 'BTS', imagemCapaUrl: '', totalMembros: 561272, showId: 's4' },
        { id: '8', nome: 'Avocados', nomeArtista: 'Billie Eilish', imagemCapaUrl: '', totalMembros: 923440, showId: 's8' },
        { id: '6', nome: 'LP Soldiers', nomeArtista: 'Linkin Park', imagemCapaUrl: '', totalMembros: 178340, showId: 's6' },
        { id: '5', nome: 'Maiden Maniacs', nomeArtista: 'Iron Maiden', imagemCapaUrl: '', totalMembros: 412033, showId: 's5' },
        { id: '7', nome: 'Onces Brasil', nomeArtista: 'Twice', imagemCapaUrl: '', totalMembros: 671888, showId: 's7' },
        { id: '9', nome: 'Falcãonáticos', nomeArtista: 'Falcão', imagemCapaUrl: '', totalMembros: 321456, showId: 's9' },
      ]);
      this.carregando.set(false);
  }

  isMembro(clubeId: string): boolean {
    return this.fasClubesDoUsuario().includes(clubeId);
  }
    if (!usuario) return;

    const inscricoesAtuais = [...usuario.fasClubes];

    if (inscricoesAtuais.includes(clube.id)) {
      return;
    }

    if (inscricoesAtuais.length >= 6) {
      this.toastService.erro('Limite de 6 fã-clubes atingido!');
      return;
    }

    inscricoesAtuais.push(clube.id);

    this.authService.atualizarInscricoes(inscricoesAtuais);

    this.toastService.sucesso(
      `Você entrou no fã-clube ${clube.nome}!`
    );

  }

  verClube(clube: FasClubeModel): void {
    if (clube.id === '2') { this.router.navigate(['/feed']); return; }

    this.router.navigate(['/fas-clubes', clube.id]);

  }
}
