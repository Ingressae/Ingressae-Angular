import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  // Se não estiver logado, deixa a requisição passar normalmente
  if (!auth.estaLogado()) {
    return next(req);
  }

  // Adiciona o token em todas as requisições
  const reqComToken = req.clone({
    setHeaders: {
      Authorization: `Bearer ${auth.usuario()?.token}`
    }
  });

  return next(reqComToken);
};