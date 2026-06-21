import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { Toast } from '../../shared/toast/toast';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
  ) {
    this.loginForm = this.fb.group({
      email: ['joao@gmail.com', [Validators.required, Validators.email]],
      senha: ['123456', [Validators.required, Validators.minLength(6)]],
    });
  }

  entrar(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toast.erro('Preencha os campos corretamente');
      return;
    }

    const valido = this.authService.autenticar(this.email?.value, this.senha?.value);

    if (valido) {
      this.toast.sucesso('Usuário logado com sucesso');
      this.router.navigate(['/inicio']);
    } else {
      this.toast.erro('Email ou senha inválidos');
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  mensagemErro(mensagem: string) {
    this.toast.erro(mensagem);
  }

  get senha() {
    return this.loginForm.get('senha');
  }
}
