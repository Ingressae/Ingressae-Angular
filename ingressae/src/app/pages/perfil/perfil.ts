import { Component, computed, inject } from '@angular/core';
import { Ingresso } from '../../models/ingresso';
import { Usuario } from '../../models/usuario';
import { CabecalhoPerfil } from './cabecalho-perfil/cabecalho-perfil';
import { ChipsFasClubes } from './chips-fas-clubes/chips-fas-clubes';
import { Historico } from './historico/historico';
import { IngressoService } from '../../services/ingresso';
import { AuthService } from '../../services/auth';
import { FasClubeService } from '../../services/fas-clube';

@Component({
  selector: 'app-perfil',
  imports: [CabecalhoPerfil, ChipsFasClubes, Historico],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil {

  private ingressoService = inject(IngressoService);
  private authService = inject(AuthService);
  private fasClubeService = inject(FasClubeService);

  usuario = this.authService.usuario;

  ingressos = this.ingressoService.buscarTodos();

  nomesFasClubes = computed(() => {
    const usuario = this.usuario();

    if (!usuario) {
      return [];
    }

    return usuario.fasClubes
      .map(id => this.fasClubeService.buscarPorId(id)?.nome)
      .filter((nome): nome is string => !!nome);
  });

}