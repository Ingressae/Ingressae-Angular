import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Fila } from './pages/fila/fila';
import { Perfil } from './pages/perfil/perfil';
import { Lista } from './pages/fas-clube/lista/lista';
import { Detalhe } from './pages/fas-clube/detalhe/detalhe';
import { Compra } from './pages/compra/compra';
import { Feed } from './pages/fas-clube/feed/feed';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    component: Inicio,
  },
  {
    path: 'feed',
    component: Feed,
  },
  {
    path: 'fila/:showId/:tipo',
    component: Fila,
  },
  {
    path: 'perfil',
    component: Perfil,
  },
  {
    path: 'fas-clubes',
    component: Lista,
  },
  {
    path: 'fas-clubes/:id',
    component: Detalhe,
  },
  {
    path: 'compra/:showId/:tipo',
    component: Compra,
  },
  {
    path: '**',
    redirectTo: 'inicio',
  },
];
