import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario, UsuarioCompleto } from '../usuario.type';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
    this.getUsuario(u).subscribe(u =>  {
      this.usuarioLogado = u;
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

  validarSenhas(s1: string, s2: string): boolean{
    if(s1 == s2){
      if(s1.length >= 6)
        return true;
      else
        alert("Senha menor que 6 caracteres");
    } else
      alert("As senhas não são iguais!");
    return false;
  }

  fazerCadastro(usuario: UsuarioCompleto) :  Observable<UsuarioCompleto>{
    return this.httpClient.post<UsuarioCompleto>(`${this.applicationUrl}/api/usuario`, usuario);
  }

  getUsuario(usuario: Usuario) : Observable<UsuarioCompleto>{
    return this.httpClient.get<UsuarioCompleto>(`${this.applicationUrl}/api/usuario/validar?login=${usuario.login}&senha=${usuario.senha}`);
  }

  atualizarUsuario(usuario: UsuarioCompleto): Observable<UsuarioCompleto>{
    return this.httpClient.put<UsuarioCompleto>(`${this.applicationUrl}/api/usuario`, usuario);
  }
}
