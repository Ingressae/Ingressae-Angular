import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { authGuard } from './guards/auth-guard';
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
    // canActivate: [authGuard]
  },
  {
    path: 'fila/:showId/normal',
    component: Fila,
    // canActivate: [authGuard]
  },
  {
    path: 'perfil',
    component: Perfil,
    // canActivate: [authGuard]
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
];
