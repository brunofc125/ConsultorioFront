import { Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit {
  menu: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
      private breakpointObserver: BreakpointObserver,
      private router: Router
    ) { }

  ngOnInit() {
    var url = this.router.url;
    switch(url){
      case "/home_page":{ this.menu = "Consultório - Agenda"; sessionStorage.setItem("menu", this.menu); break; }
      case "/paciente_list": { this.menu = "Pacientes"; sessionStorage.setItem("menu", this.menu); break; }
      case "/paciente_cadastro": { this.menu = "Pacientes"; sessionStorage.setItem("menu", this.menu); break; }
      case "/agendamento_cadastro": { this.menu = "Agendamentos"; sessionStorage.setItem("menu", this.menu); break; }
      case "/agendamento_list": { this.menu = "Agendamentos"; sessionStorage.setItem("menu", this.menu); break; }
      default: { this.menu = "Consultório - Agenda"; sessionStorage.setItem("menu", this.menu); break; }
    }
  }

  sair(): void{
    localStorage.removeItem("UsuarioLogado");
    sessionStorage.setItem("menu", "Consultório - Agenda");
  }

  pacientePage(): void{
    this.menu = "Pacientes";
    sessionStorage.setItem("menu", this.menu);
  }

  agendamentoPage(): void{
    this.menu = "Agendamentos";
    sessionStorage.setItem("menu", this.menu);
  }

  homePage(): void{
    this.menu = "Consultório - Agenda";
    sessionStorage.setItem("menu", this.menu);
  }
}
