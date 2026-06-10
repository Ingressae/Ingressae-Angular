import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Show {
  id: number;
  title: string;
  date: string;
  location: string;
  gradientClass: string;
}

@Component({
  selector: 'app-card-show',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-show.html',
  styleUrls: ['./card-show.scss']
})
export class CardShow {
  @Input() show!: Show;
}
