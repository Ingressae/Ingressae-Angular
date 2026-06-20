import { Component, OnInit } from '@angular/core';
import { Banner } from './banner/banner';
import { Comentarios } from '../comentarios/comentarios';
import { AuthService } from '../../../services/auth';
import { QuickSort } from '../../../shared/estruturas/quick-sort';
import { Comentario } from '../../../models/comentario';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FasClubeService } from '../../../services/fas-clube';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastService } from '../../../services/toast';

@Component({
  selector: 'app-feed',
  imports: [Banner, Comentarios, NgIf, FormsModule, RouterLink],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed implements OnInit {
  //vai ser usado o quick sort por motivo de ser efeciente para algoritimos grandes
  //  e não utiliza tanta memoria quanto outros tão efecientes

  //usado lista por motivos de facilidade de manipulação e ordenação

  isEditandoNovoPost: boolean = false;
  novoComentario = '';
  toastVisivel = false;
  idFaClube = '1';

  constructor(
    private fasClubeService: FasClubeService,
    private AuthService: AuthService,
    private route: ActivatedRoute,
    private toast: ToastService,
  ) {}
  listaComentarios: Comentario[] = [];
  ngOnInit(): void {
    this.buscarLista();
    this.idFaClube = this.route.snapshot.paramMap.get('id') ?? '0';
  }

  adicionarFormatacao(marcador: string): void {
    this.novoComentario += marcador;
    document.getElementById('textArea')?.focus();
  }

  publicar(): void {
    if (!this.novoComentario.trim()) {
      return;
    }

    const comentario: Comentario = {
      id: crypto.randomUUID(),
      autorId: '999',
      nomeAutor: 'Fulano',
      fotoAutorUrl: 'https://i.pravatar.cc/150?img=10',
      conteudo: this.novoComentario,
      criadoEm: new Date(),
      qtdlike: 0,
    };
    this.fasClubeService.adicionarComentario(comentario);
    this.isEditandoNovoPost = !this.isEditandoNovoPost;
    this.buscarLista();
    this.novoComentario = '';
  }

  buscarLista() {
    this.listaComentarios = QuickSort.sort(
      this.fasClubeService.getComentarios(),
      (a, b) => b.criadoEm.getTime() - a.criadoEm.getTime(),
    );
  }

  possivelNovoPost() {
    console.log(this.isUsuarioFa());
    if (this.isUsuarioFa()) {
      this.isEditandoNovoPost = !this.isEditandoNovoPost;
    } else {
      this.mostrarToast();
    }
  }

  isUsuarioFa() {
    return this.AuthService.participaDoFasClube(this.idFaClube);
  }
  //TODO : arrumar o toast
  mostrarToast() {
    this.toast.erro('    Participe do fã clube para comentar');
  }
}
