import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth';
import { FasClubeService } from '../../../../services/fas-clube';
import { FasClube } from '../../../../models/fas-clube';
import { ImagemClubeService } from '../../../../services/imagem-clube';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
})
export class Banner implements OnInit {
  @Input({ required: true }) isMembro: boolean = false;
  @Input({ required: true }) idFaClube: string = '0';
  clube!: FasClube | null;
  membros: number = 0;

  constructor(
    private AuthService: AuthService,
    private fasClubeService: FasClubeService,
    private imagemClubeService: ImagemClubeService,
  ) {}

  ngOnInit(): void {
    this.clube = this.fasClubeService.buscarPorId(this.idFaClube) ?? null;
  }

  obterImagemClube(): string | undefined {
    return this.imagemClubeService.obterImagemClube(this.idFaClube);
  }

  curtirClube() {
    if (!this.isMembro) {
      this.AuthService.adicionarAoFasClube(this.idFaClube);
      this.fasClubeService.adicionarMembro(this.idFaClube);
      this.faClubleService.adicionarMembro(this.idFaClube);
      this.isMembro = true;
    } else {
      this.AuthService.removerDoFasClube(this.idFaClube);
      this.fasClubeService.removerMembro(this.idFaClube);
      this.faClubleService.removerMembro(this.idFaClube);
      this.isMembro = false;
    }
    this.atualizarClube();
  }

  atualizarClube() {
    this.clube = this.faClubleService.buscarPorId(this.idFaClube) ?? null;
  }
}
