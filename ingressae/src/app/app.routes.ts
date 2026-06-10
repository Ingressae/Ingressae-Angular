import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Perfil } from './pages/perfil/perfil';
import { Lista } from './pages/fas-clube/lista/lista';
import { Detalhe } from './pages/fas-clube/detalhe/detalhe';
import { Fila } from './pages/fila/fila';
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
    path: 'fila/:showId/preferencial',
    component: Fila,
  },
  {
    path: 'fila/:showId/normal',
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
    path: 'feed',
    component: Feed,
  },
  {
    path: '**',
    redirectTo: 'inicio',
  },
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
    path: 'fila/:showId/preferencial',
    component: Fila,
  },
  {
    path: 'fila/:showId/normal',
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
    path: '**',
    redirectTo: 'inicio',
  },
];
