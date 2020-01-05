import { Component, OnInit } from '@angular/core';
import { UsuarioCompleto } from '../usuario.type';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  form;
  senha1: string;
  senha2: string;
  user: UsuarioCompleto;
  naoAlterarSenha: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService
  ) {
    this.user = JSON.parse(localStorage.getItem("UsuarioLogado"));
    this.form = this.formBuilder.group({
      inputNome: this.user.nome,
      inputLogin: this.user.login
    });
    this.senha1 = this.senha2 = "";
    this.naoAlterarSenha = true;
  }

  ngOnInit() {
  }

  editarLogin(usuario){
    var usuarioAlterado = new UsuarioCompleto(usuario.inputNome, usuario.inputLogin, this.user.senha, this.user.id);
    if(!this.naoAlterarSenha && this.service.validarSenhas(this.senha1, this.senha2)){
      usuarioAlterado.senha = this.senha1;
      this.service.atualizarUsuario(usuarioAlterado).subscribe(
        success => { 
            if(success){
              alert("Atualização realizada!");
              this.senha1 = this.senha2 = "";
              localStorage.setItem("UsuarioLogado", JSON.stringify(usuarioAlterado));
            } else{
              alert("Erro na atualização!");
            }
          },
        error => { console.log(error); alert("Erro na atualização!") }
      );
    } else if(this.naoAlterarSenha){
      this.service.atualizarUsuario(usuarioAlterado).subscribe(
        success => { 
            if(success){
              alert("Atualização realizada!");
              this.senha1 = this.senha2 = "";
              localStorage.setItem("UsuarioLogado", JSON.stringify(usuarioAlterado));
            } else{
              alert("Erro na atualização!");
            }
          },
        error => { console.log(error); alert("Erro na atualização!") }
      );
    }
    
  }

  checkedSenha(): void{
    this.naoAlterarSenha = !this.naoAlterarSenha;
  }

}
