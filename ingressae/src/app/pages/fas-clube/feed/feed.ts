import { Component, OnInit } from '@angular/core';
import { Banner } from './banner/banner';
import { Comentarios } from '../comentarios/comentarios';
import { FasClube } from '../../../services/fas-clube';
import { QuickSort } from '../../../shared/estruturas/quick-sort';
import { Comentario } from '../../../models/comentario';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feed',
  imports: [Banner, Comentarios, NgIf, FormsModule],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed implements OnInit {
  //vai ser usado o quick sort por motivo de ser efeciente para algoritimos grandes
  //  e não utiliza tanta memoria quanto outros tão efecientes

  isEditandoNovoPost: boolean = false;

  constructor(private fasClubeService: FasClube) {}
  listaComentarios: Comentario[] = [];
  ngOnInit(): void {
    this.buscarLista();
  }

  novoComentario = '';

  adicionarFormatacao(marcador: string): void {
    this.novoComentario += marcador;
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
}
