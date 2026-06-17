import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { AnosMembroPipe } from '../../../shared/pipes/anos-membro-pipe';

@Component({
  selector: 'app-cabecalho-perfil',
  imports: [CommonModule, AnosMembroPipe],
  templateUrl: './cabecalho-perfil.html',
  styleUrl: './cabecalho-perfil.scss',
})

export class CabecalhoPerfil {

  @Input() usuario!: Usuario;

  get iniciais(): string {
    return this.usuario.nome
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  get membroPreferencial(): boolean {
    return this.usuario.anosNaPlataforma >= 5;
  }

}
