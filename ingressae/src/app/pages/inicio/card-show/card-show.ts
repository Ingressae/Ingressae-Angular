import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface Show {
  id: number;
  title: string;
  date: string;
  location: string;
  gradientClass: string;
  prefAvailable: boolean;
  normalAvailable: boolean;
}

@Component({
  selector: 'app-card-show',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card-show.html',
  styleUrls: ['./card-show.scss']
})
export class CardShow {
  @Input() show!: Show;
}
