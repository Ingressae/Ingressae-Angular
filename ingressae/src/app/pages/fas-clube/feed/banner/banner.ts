import { Component, input, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth';
import { FasClube } from '../../../../models/fas-clube';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
})
export class Banner {
  @Input({ required: true }) isMembro: boolean = false;
  @Input() clube!: FasClube;

  constructor(private authService: AuthService) {}

  curtirClube() {
    if (!this.isMembro) {
      this.authService.adicionarAoFasClube(this.clube?.id);
      this.isMembro = true;
    } else {
      this.authService.removerDoFasClube(this.clube?.id);
      this.isMembro = false;
    }
  }
}
