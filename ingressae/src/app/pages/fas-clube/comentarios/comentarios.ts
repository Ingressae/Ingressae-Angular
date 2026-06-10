import { Component, Input } from '@angular/core';
import { Comentario } from '../../../models/comentario';
import { DatePipe } from '@angular/common';
import { MarkdownPipe } from '../../../shared/pipes/markdown-pipe';

@Component({
  selector: 'app-comentarios',
  imports: [DatePipe, MarkdownPipe],
  templateUrl: './comentarios.html',
  styleUrl: './comentarios.scss',
})
export class Comentarios {
  @Input() comentario!: Comentario;
}
