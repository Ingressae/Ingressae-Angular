import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chips-fas-clubes',
  imports: [CommonModule, RouterLink],
  templateUrl: './chips-fas-clubes.html',
  styleUrl: './chips-fas-clubes.scss',
})
export class ChipsFasClubes {

  @Input() fasClubes: string[] = [];

  get limiteAtingido(): boolean {
    return this.fasClubes.length >= 5;
  }

}
