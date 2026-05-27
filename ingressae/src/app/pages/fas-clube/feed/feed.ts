import { Component } from '@angular/core';
import { Banner } from './banner/banner';
import { Comentarios } from '../comentarios/comentarios';

@Component({
  selector: 'app-feed',
  imports: [Banner, Comentarios],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed {}
