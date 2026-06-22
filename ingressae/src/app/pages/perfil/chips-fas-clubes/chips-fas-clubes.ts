import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FasClubeService } from '../../../services/fas-clube';

@Component({
  selector: 'app-chips-fas-clubes',
  imports: [CommonModule, RouterLink],
  templateUrl: './chips-fas-clubes.html',
  styleUrl: './chips-fas-clubes.scss',
})
export class ChipsFasClubes {

  private fasClubeService = inject(FasClubeService);

  @Input() fasClubes: string[] = [];

  get limiteAtingido(): boolean {
    return this.fasClubes.length >= 5;
  }

  get nomesFasClubes(): string[] {
    return this.fasClubes.map((id) => this.fasClubeService.buscarPorId(id)?.nome ?? id);
  }

}
