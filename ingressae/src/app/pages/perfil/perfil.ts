import { Component } from '@angular/core';
import { Ingresso } from '../../models/ingresso';
import { Usuario } from '../../models/usuario';
import { CabecalhoPerfil } from './cabecalho-perfil/cabecalho-perfil';
import { ChipsFasClubes } from './chips-fas-clubes/chips-fas-clubes';
import { Historico } from './historico/historico';

@Component({
  selector: 'app-perfil',
  imports: [CabecalhoPerfil, ChipsFasClubes, Historico],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil {

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

  ingressos: Ingresso[] = [
    {
      id: '1',
      showId: '1',
      usuarioId: '1',
      tipo: 'PREFERENCIAL' as any,
      compradoEm: new Date(),
      status: 'CONFIRMADO' as any,
    },
    {
      id: '2',
      showId: '2',
      usuarioId: '1',
      tipo: 'NORMAL' as any,
      compradoEm: new Date(),
      status: 'CONFIRMADO' as any,
    }
  ];

}
