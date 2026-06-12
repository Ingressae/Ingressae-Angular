import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((erro: HttpErrorResponse) => {

      switch (erro.status) {
        case 401:
          toast.erro('Sessão expirada. Faça login novamente.');
          router.navigate(['/inicio']);
          break;
        case 403:
          toast.erro('Você não tem permissão para acessar isso.');
          break;
        case 404:
          toast.erro('Recurso não encontrado.');
          break;
        case 500:
          toast.erro('Erro interno do servidor. Tente novamente.');
          break;
        default:
          toast.erro('Algo deu errado. Tente novamente.');
      }

      return throwError(() => erro);
    })
  );
};