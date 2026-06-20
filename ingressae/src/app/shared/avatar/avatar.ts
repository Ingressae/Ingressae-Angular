import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [CommonModule],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
})
export class Avatar {

  @Input() iniciais = 'MS';
}