import { Injectable, signal } from '@angular/core';

export interface MensagemToast {
  texto: string;
  tipo: 'sucesso' | 'erro' | 'aviso';
}

@Injectable({
  providedIn: 'root'
})

export class ToastService {

  private mensagem = signal<MensagemToast | null>(null);

  mensagemAtual = this.mensagem.asReadonly();

  sucesso(texto: string): void {
    this.mensagem.set({ texto, tipo: 'sucesso' });
    this.limparApos(3000);
  }

  erro(texto: string): void {
    this.mensagem.set({ texto, tipo: 'erro' });
    this.limparApos(4000);
  }

  aviso(texto: string): void {
    this.mensagem.set({ texto, tipo: 'aviso' });
    this.limparApos(3000);
  }

  private limparApos(ms: number): void {
    setTimeout(() => this.mensagem.set(null), ms);
  }
}