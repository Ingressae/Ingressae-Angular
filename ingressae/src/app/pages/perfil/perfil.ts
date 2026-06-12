import { Component, inject } from '@angular/core';
import { Ingresso } from '../../models/ingresso';
import { Usuario } from '../../models/usuario';
import { CabecalhoPerfil } from './cabecalho-perfil/cabecalho-perfil';
import { ChipsFasClubes } from './chips-fas-clubes/chips-fas-clubes';
import { Historico } from './historico/historico';
import { IngressoService } from '../../services/ingresso';

@Component({
  selector: 'app-perfil',
  imports: [CabecalhoPerfil, ChipsFasClubes, Historico],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil {

  private ingressoService = inject(IngressoService);

  usuario: Usuario = {
    id: '1',
    nome: 'Maria Silva',
    email: 'maria@email.com',
    idade: 28,
    fotoUrl: '',
    membroDesde: new Date('2018-01-01'),
    anosNaPlataforma: 7,
    fasClubes: ['XO Family', 'Coldplayers BR', 'Swifties Brasil', 'Firebreathers'],
    token: ''
  };

  // Pega os ingressos direto do serviço, sempre atualizado
  ingressos = this.ingressoService.buscarTodos();
}