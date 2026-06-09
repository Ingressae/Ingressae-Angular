import { Component, Input } from '@angular/core';
import { Comentario } from '../../../models/comentario';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comentarios',
  imports: [DatePipe],
  templateUrl: './comentarios.html',
  styleUrl: './comentarios.scss',
})
export class Comentarios {
  @Input() comentario!: Comentario;
}
