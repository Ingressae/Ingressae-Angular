import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Show } from '../../../models/show';
import { AuthService } from '../../../services/auth';
import { ToastService } from '../../../services/toast';

@Component({
  selector: 'app-card-show',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card-show.html',
  styleUrls: ['./card-show.scss']
})
export class CardShow {
  @Input({ required: true }) show!: Show;
  @Output() abrirModal = new EventEmitter<Show>();

  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  // Emite o evento passando as informações do show clicado para o componente Pai (inicio)
  dispararModal() {
    this.abrirModal.emit(this.show);
  }

  // Lista de gradientes para alternar visualmente entre os cards
  private gradientes = ['grad-purple', 'grad-blue', 'grad-redPurple', 'grad-cyan', 'grad-orange'];

  get gradientClass(): string {
    const indice = parseInt(this.show.id, 10) % this.gradientes.length;
    return this.gradientes[indice];
  }

  get dataFormatada(): string {
    return this.show.dataEvento.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  get prefAvailable(): boolean {
    return new Date() >= this.show.dataFilaPreferencial;
  }

  get dataFilaPreferencialFormatada(): string {
    return this.show.dataFilaPreferencial.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  get normalAvailable(): boolean {
    return new Date() >= this.show.dataFilaNormal;
  }

  get dataFilaNormalFormatada(): string {
    return this.show.dataFilaNormal.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  // Verifica se o usuário tem 5+ anos de plataforma para acessar a fila preferencial
  get elegivelPreferencial(): boolean {
    return (this.authService.usuario()?.anosNaPlataforma ?? 0) >= 5;
  }

  // Verifica elegibilidade antes de redirecionar para a fila preferencial
  entrarFilaPreferencial(): void {
    if (!this.prefAvailable) return;

    if (!this.elegivelPreferencial) {
      this.toastService.aviso('Você precisa ter no mínimo 5 anos de plataforma para acessar a fila preferencial.');
      return;
    }

    this.router.navigate(['/fila', this.show.id, 'preferencial']);
  }

  // Redireciona direto para a fila normal, sem restrições
  entrarFilaNormal(): void {
    if (!this.normalAvailable) return;
    this.router.navigate(['/fila', this.show.id, 'normal']);
  }
}