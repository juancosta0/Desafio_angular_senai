import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; //Importando o formmodule
import { CommonModule } from '@angular/common'; //Importando o CommonModule
import { Usuario } from '../../models/usuario.model';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router) {
  }

  nome!: string;
  password!: string;
  usuario!: Usuario;

  public authentication(): void {
    this.loginService.obterUsuarios
      (this.nome, this.password!).subscribe({
        next: (user: Usuario) => {
          if (user.nome === this.nome) {
            localStorage.setItem('usuario', JSON.stringify(user));
            this.router.navigate(['/home']);
            console.log(user.id, user.nome, user.email);
          }
        },
        error: (err: Error) => {
          console.error("Erro ao autenticar:", err);
          alert("Erro ao autenticar usuário");
        }
      });
    }

  }
