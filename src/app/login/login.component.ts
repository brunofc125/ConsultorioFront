import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Usuario, UsuarioCompleto } from '../usuario.type';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  formLogin;
  formCadastro;
  login: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService,
    private router: Router
  ) {
    this.formLogin = this.formBuilder.group({
      inputUsuario: '',
      inputSenha: ''
    });
    this.formCadastro = this.formBuilder.group({
      inputLogin: '',
      inputNome: '',
      inputSenha1: '',
      inputSenha2: ''
    });
    this.login = true;
  }

  ngOnInit() {
    if(localStorage.getItem("UsuarioLogado") != null)
      this.router.navigate(["/"]);
  }

  fazerLogin(customerData): void{
    this.service.fazerLogin(customerData);
    sessionStorage.setItem("menu", "Consultório - Agenda");
  }

  fazerCadastro(customerData): void{
    if(this.service.validarSenhas(customerData.inputSenha1, customerData.inputSenha2)){
      var user = new UsuarioCompleto(customerData.inputNome, customerData.inputLogin, customerData.inputSenha1);
      console.log(user);
      this.service.fazerCadastro(user).subscribe(
        success => { 
          if(success){
            alert("Cadastro realizado!");
            this.formCadastro.reset();
          } else{
            alert("Erro no Cadastro, pode ser que já exista um usuário com este login!");
          }
        },
      error => { console.log(error); alert("Erro no Cadastro!") }
      );
    }
  }

  cadastro(): void{
    this.login = false;
  }

  logar(): void{
    this.login = true;
  }

}
