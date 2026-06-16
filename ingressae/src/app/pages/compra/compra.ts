import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Assento } from '../../models/assento';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ShowService } from '../../services/show';
import { Show } from '../../models/show';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast';
import { StatusIngresso } from '../../enums/status-ingresso';
import { TipoIngresso } from '../../enums/tipo-ingresso';
import { IngressoService } from '../../services/ingresso';

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
  private toast = inject(ToastService);
  private ingressoService = inject(IngressoService);


  show: Show | undefined;
  tipo = '';

  // Temporizador — 15 minutos
  tempoRestante = 15 * 60;
  private timerInterval: any;

  // Modal de tempo esgotado
  mostrarModalTempoEsgotado = false;

  // Formulário
  nome = '';
  cpf = '';
  email = '';
  telefone = '';

  // Assentos mock
  assentos: Assento[] = [];
  assentosSelecionados: Assento[] = [];

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
    return !!this.nome && !!this.cpf && !!this.email && !!this.telefone && this.assentosSelecionados.length > 0;
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
        this.mostrarModalTempoEsgotado = true;
      }
    }, 1000);
  }

  selecionarAssento(assento: Assento): void {
    if (!assento.disponivel) return;

    const jaSelecionado = this.assentosSelecionados.find(a => a.id === assento.id);

    if (jaSelecionado) {
      this.assentosSelecionados = this.assentosSelecionados.filter(a => a.id !== assento.id);
      return;
    }

    if (this.assentosSelecionados.length >= this.limiteIngressos) {
      return;
    }

    this.assentosSelecionados.push(assento);
  }

  isSelecionado(assento: Assento): boolean {
    return this.assentosSelecionados.some(a => a.id === assento.id);
  }

  realizarPagamento(): void {
    if (!this.formularioValido) return;

    clearInterval(this.timerInterval);

    // Cria um ingresso para cada assento selecionado
    this.assentosSelecionados.forEach((assento, index) => {
      this.ingressoService.adicionar({
        id: crypto.randomUUID(),
        showId: this.show?.id ?? '', // usa o ID, não o nome
        usuarioId: '1',
        tipo: this.isPreferencial ? TipoIngresso.PREFERENCIAL : TipoIngresso.NORMAL,
        compradoEm: this.show?.dataEvento ?? new Date(),
        status: StatusIngresso.CONFIRMADO,
      });
    });

    this.toast.sucesso('Compra realizada com sucesso!');

    setTimeout(() => {
      this.router.navigate(['/perfil']);
    }, 2000);
  }

  entrarNaFilaNovamente(): void {
    this.router.navigate(['/fila', this.show?.id, this.tipo]);
  }

  voltarParaInicio(): void {
    this.router.navigate(['/inicio']);
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