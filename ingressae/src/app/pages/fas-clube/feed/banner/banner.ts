import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth';
import { FasClubeService } from '../../../../services/fas-clube';
import { FasClube } from '../../../../models/fas-clube';

@Component({
  selector: 'app-banner',
  imports: [],
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
    private faClubleService: FasClubeService,
  ) {}

  ngOnInit(): void {
    this.clube = this.faClubleService.buscarPorId(this.idFaClube) ?? null;
  }

  curtirClube() {
    if (!this.isMembro) {
      this.AuthService.adicionarAoFasClube(this.idFaClube);
      this.faClubleService.adicionarMembro(this.idFaClube);
      this.isMembro = true;
    } else {
      this.AuthService.removerDoFasClube(this.idFaClube);
      this.faClubleService.removerMembro(this.idFaClube);
      this.isMembro = false;
    }
    this.atualizarClube();
  }

  atualizarClube() {
    this.clube = this.faClubleService.buscarPorId(this.idFaClube) ?? null;
  }
}
