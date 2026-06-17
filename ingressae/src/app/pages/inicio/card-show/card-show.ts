import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface Show {
  id: string; // Mudado para string conforme o teu banco de dados
  nome: string;
  artista: string;
  local: string;
  dataEvento: Date | string;
  imagemCapaUrl: string;
  dataFilaPreferencial: Date | string | null;
  dataFilaNormal: Date | string | null;
  fasClubeId: string;
  descricao: string;
  genero?: string; // Mantemos opcional (?) com o ponto de interrogação
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

  // Getters para verificar se as filas estão disponíveis (se as datas existem)
  get temFilaPreferencial(): boolean {
    return !!this.show.dataFilaPreferencial;
  }

  get temFilaNormal(): boolean {
    return !!this.show.dataFilaNormal;
  }
}