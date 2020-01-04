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
  form;

  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      inputUsuario: '',
      inputSenha: ''
    })
  }

  ngOnInit() {
    if(localStorage.getItem("UsuarioLogado") != null)
      this.router.navigate(["/"]);
  }

  fazerLogin(customerData): void{
    this.service.fazerLogin(customerData);
    sessionStorage.setItem("menu", "Consultório - Agenda");
  }

}
