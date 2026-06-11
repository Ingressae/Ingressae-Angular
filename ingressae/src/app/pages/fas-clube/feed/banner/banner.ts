import { Component, Input } from '@angular/core';
import { AuthService } from '../../../../services/auth';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
})
export class Banner {
  @Input({ required: true }) isMembro: boolean = false;
  @Input({ required: true }) idFaClube: string = '1';

  constructor(private AuthService: AuthService) {}

  curtirClube() {
    if (!this.isMembro) {
      this.AuthService.adicionarAoFasClube(this.idFaClube);
      this.isMembro = true;
    } else {
      this.AuthService.removerDoFasClube(this.idFaClube);
      this.isMembro = false;
    }
  }
}
