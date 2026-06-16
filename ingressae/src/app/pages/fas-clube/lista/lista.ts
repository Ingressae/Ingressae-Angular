import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FasClube as FasClubeModel } from '../../../models/fas-clube';
import { AuthService } from '../../../services/auth';
import { ToastService } from '../../../services/toast';
import { EstadoVazio } from '../../../shared/estado-vazio/estado-vazio';
import { Loading } from '../../../shared/loading/loading';
import { BuscaSequencial } from '../../../shared/estruturas/busca-sequencial';
import { CardPostagem } from '../card-postagem/card-postagem';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, EstadoVazio, Loading, CardPostagem],
  templateUrl: './lista.html',
  styleUrl: './lista.scss',
})
export class Lista implements OnInit {
  fasClubes = signal<FasClubeModel[]>([]);
  termoBusca = signal<string>('');
  carregando = signal<boolean>(true);

  // Forçamos a reatividade criando um sinal para as inscrições
  inscricoesAtualizadas = signal<number>(0);

  fasClubesFiltrados = computed(() => {
    const termo = this.termoBusca();
    if (!termo) return this.fasClubes();
    const porArtista = BuscaSequencial.filtrar(this.fasClubes(), termo, 'nomeArtista');
    const porNome = BuscaSequencial.filtrar(this.fasClubes(), termo, 'nome');
    const todos = [...porArtista];
    porNome.forEach((clube: any) => {
      if (!todos.some((c) => c.id === clube.id)) todos.push(clube);
    });
    return todos;
  });

  usuarioAtual = computed(() => this.authService.usuario());
  
  // Aqui garantimos que o Angular veja a mudança no array
  fasClubesDoUsuario = computed(() => {
    this.inscricoesAtualizadas(); // Dependência para forçar atualização
    return this.usuarioAtual()?.fasClubes || [];
  });

  quantidadeInscricoes = computed(() => this.fasClubesDoUsuario().length);
  atingiuLimiteInscricoes = computed(() => this.quantidadeInscricoes() >= 6);
  temResultados = computed(() => this.fasClubesFiltrados().length > 0);

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarFasClubes();
  }

  carregarFasClubes(): void {
    setTimeout(() => {
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
    }, 500);
  }

  isMembro(clubeId: string): boolean {
    return this.fasClubesDoUsuario().includes(clubeId);
  }


entrarClube(clube: FasClubeModel): void {
  const usuario = this.usuarioAtual();
  if (!usuario) return;

  const inscricoesAtuais = [...usuario.fasClubes];

  // 1. Verifica se já é membro
  if (inscricoesAtuais.includes(clube.id)) return;

  // 2. Verifica o limite de 6
  if (inscricoesAtuais.length >= 6) {
    this.toastService.erro('Limite de 6 fã-clubes atingido!');
    return;
  }

  // 3. Adiciona e avisa o serviço para salvar
  inscricoesAtuais.push(clube.id);
  this.authService.atualizarInscricoes(inscricoesAtuais);
  this.toastService.sucesso(`Você entrou no fã-clube ${clube.nome}!`);
}


  verClube(clube: FasClubeModel): void {
    if (clube.id === '2') {
      this.router.navigate(['/feed']);
      return;
    }

    this.router.navigate(['/fas-clubes', clube.id]);
  }
}
