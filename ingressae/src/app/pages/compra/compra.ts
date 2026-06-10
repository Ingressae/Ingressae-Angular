import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Assento } from '../../models/assento';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ShowService } from '../../services/show';
import { Show } from '../../models/show';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compra',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './compra.html',
  styleUrl: './compra.scss',
})

export class Compra implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private showService = inject(ShowService);

  show: Show | undefined;
  tipo = '';

  // Temporizador — 15 minutos
  tempoRestante = 15 * 60;
  private timerInterval: any;

  // Toast
  mostrarToast = false;

  // Formulário
  nome = '';
  cpf = '';
  email = '';
  telefone = '';

  // Assentos mock
  assentos: Assento[] = [];
  assentoSelecionado: Assento | null = null;

  get isPreferencial(): boolean {
    return this.tipo === 'preferencial';
  }

  get limiteIngressos(): number {
    return this.isPreferencial ? 1 : 2;
  }

  get minutos(): string {
    return String(Math.floor(this.tempoRestante / 60)).padStart(2, '0');
  }

  get segundos(): string {
    return String(this.tempoRestante % 60).padStart(2, '0');
  }

  get tempoPerigoso(): boolean {
    return this.tempoRestante <= 120; // menos de 2 minutos
  }

  get formularioValido(): boolean {
    return !!this.nome && !!this.cpf && !!this.email && !!this.telefone && !!this.assentoSelecionado;
  }

  ngOnInit(): void {
    const showId = this.route.snapshot.paramMap.get('showId') ?? '';
    this.tipo = this.route.snapshot.paramMap.get('tipo') ?? 'normal';
    this.show = this.showService.buscarPorId(showId);
    this.gerarAssentos();
    this.iniciarTimer();
  }

  private gerarAssentos(): void {
    const setores = ['Pista', 'Setor A', 'Setor B', 'Camarote'];
    let id = 1;

    setores.forEach(setor => {
      for (let fileira = 1; fileira <= 3; fileira++) {
        for (let numero = 1; numero <= 8; numero++) {
          this.assentos.push({
            id: String(id++),
            setor,
            fileira: `F${fileira}`,
            numero,
            disponivel: Math.random() > 0.3
          });
        }
      }
    });
  }

  private iniciarTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.tempoRestante > 0) {
        this.tempoRestante--;
      } else {
        clearInterval(this.timerInterval);
        this.router.navigate(['/inicio']);
      }
    }, 1000);
  }

  selecionarAssento(assento: Assento): void {
    if (!assento.disponivel) return;
    this.assentoSelecionado = assento;
  }

  realizarPagamento(): void {
    if (!this.formularioValido) return;

    clearInterval(this.timerInterval);
    this.mostrarToast = true;

    setTimeout(() => {
      this.mostrarToast = false;
      this.router.navigate(['/perfil']);
    }, 3000);
  }

  get setoresUnicos(): string[] {
    return [...new Set(this.assentos.map(a => a.setor))];
  }

  assentosPorSetor(setor: string): Assento[] {
    return this.assentos.filter(a => a.setor === setor);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }
}
