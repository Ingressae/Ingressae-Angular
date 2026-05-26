import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoadingService {

  private carregando = signal<boolean>(false);

  estaCarregando = this.carregando.asReadonly();

  ativar(): void {
    this.carregando.set(true);
  }

  desativar(): void {
    this.carregando.set(false);
  }
}