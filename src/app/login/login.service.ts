import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario, UsuarioCompleto } from '../usuario.type';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private usuarioAutenticado: boolean = false;
  usuarioLogado: UsuarioCompleto;

  applicationUrl = environment.applicationUrl;
  
  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {
    this.usuarioLogado = null;
  }

  fazerLogin(user): void{
    this.usuarioLogado = null;   
    var u = new Usuario(user.inputUsuario, user.inputSenha);
    console.log(u);
    this.getUsuario(u).subscribe(u =>  {
      this.usuarioLogado = u;
      console.log(u);
      this.validar();
    });
  }

  validar() {
    if(this.usuarioLogado != null){
      this.usuarioAutenticado = true;
      alert("Logado com sucesso!");
      this.router.navigate(['/'])
      localStorage.setItem("UsuarioLogado", JSON.stringify(this.usuarioLogado));
    } else{
      this.usuarioAutenticado = false;
      alert("Login ou senhas incorretos!");
    }
  }

  getUsuario(usuario: Usuario) : Observable<UsuarioCompleto>{
    return this.httpClient.get<UsuarioCompleto>(`${this.applicationUrl}/api/usuario/validar?login=${usuario.login}&senha=${usuario.senha}`);
  }

  atualizarUsuario(usuario: UsuarioCompleto): Observable<UsuarioCompleto>{
    return this.httpClient.put<UsuarioCompleto>(`${this.applicationUrl}/api/usuario`, usuario);
  }
}
