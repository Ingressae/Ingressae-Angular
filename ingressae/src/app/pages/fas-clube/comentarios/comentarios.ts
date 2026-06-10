import { Component, Input } from '@angular/core';
import { Comentario } from '../../../models/comentario';
import { DatePipe, NgClass } from '@angular/common';
import { MarkdownPipe } from '../../../shared/pipes/markdown-pipe';

@Component({
  selector: 'app-comentarios',
  imports: [DatePipe, MarkdownPipe, NgClass],
  templateUrl: './comentarios.html',
  styleUrl: './comentarios.scss',
})
export class Comentarios {
  @Input() comentario!: Comentario;
  curtido: boolean = true;

  curtir() {
    this.curtido = !this.curtido;
    this.comentario.qtdlike++;
  }

  descurtir() {
    this.curtido = !this.curtido;
    this.comentario.qtdlike--;
  }
}
