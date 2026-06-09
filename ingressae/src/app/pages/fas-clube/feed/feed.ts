import { Component, OnInit } from '@angular/core';
import { Banner } from './banner/banner';
import { Comentarios } from '../comentarios/comentarios';
import { FasClube } from '../../../services/fas-clube';
import { QuickSort } from '../../../shared/estruturas/quick-sort';
import { Comentario } from '../../../models/comentario';

@Component({
  selector: 'app-feed',
  imports: [Banner, Comentarios],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed implements OnInit {
  //vai ser usado o quick sort por motivo de ser efeciente para algoritimos grandes
  //  e não utiliza tanta memoria quanto outros tão efecientes

  constructor(private fasClubeService: FasClube) {}
  listaComentarios: Comentario[] = [];
  ngOnInit(): void {
    this.listaComentarios = QuickSort.sort(
      this.fasClubeService.getComentarios(),
      (a, b) => b.criadoEm.getTime() - a.criadoEm.getTime(),
    );
  }
}
