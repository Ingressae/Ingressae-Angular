import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FasClube } from '../../../models/fas-clube';
import { ImagemClubeService } from '../../../services/imagem-clube';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card-postagem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-postagem.html',
  styleUrl: './card-postagem.scss',
})
export class CardPostagem {
  @Input({ required: true }) clube!: FasClube;
  @Input({ required: true }) isMembro: boolean = false;
  @Input({ required: true }) limiteAtingido: boolean = false; // Este cara precisa receber o valor da lista

  @Output() entrar = new EventEmitter<FasClube>();
  @Output() sair = new EventEmitter<FasClube>();
  @Output() ver = new EventEmitter<FasClube>();

  constructor(
    private imagemClubeService: ImagemClubeService,
    private router: Router,
  ) {}

  obterImagemClube(): string | undefined {
    return this.imagemClubeService.obterImagemClube(this.clube.id);
  }

  formatarNumero(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace('.0', '') + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
    return num.toString();
  }

  onEntrar(event: Event): void {
    event.stopPropagation();
    this.entrar.emit(this.clube);
  }

  onSair(event: Event): void {
    event.stopPropagation();
    this.sair.emit(this.clube);
  }

  onVer(event: Event): void {
    event.stopPropagation();
    this.ver.emit(this.clube);
  }
}
