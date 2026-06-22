import { Component, inject, computed } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { CabecalhoPerfil } from './cabecalho-perfil/cabecalho-perfil';
import { ChipsFasClubes } from './chips-fas-clubes/chips-fas-clubes';
import { Historico } from './historico/historico';
import { IngressoService } from '../../services/ingresso';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-perfil',
  imports: [CabecalhoPerfil, ChipsFasClubes, Historico],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil {

  private ingressoService = inject(IngressoService);
  private authService = inject(AuthService);

  // Pega o usuário logado direto do AuthService
  usuario = computed(() => this.authService.usuario());

  // Filtra os ingressos pelo id do usuário logado
  ingressos = computed(() => {
    const usuario = this.authService.usuario();
    if (!usuario) return [];
    return this.ingressoService.buscarPorUsuario(usuario.id);
  });
}