import { Component, OnInit } from '@angular/core';
import { UsuarioCompleto } from '../usuario.type';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  user: UsuarioCompleto;
  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("UsuarioLogado"));
  }

  editarLogin(){
    alert("teste");
  }

}
