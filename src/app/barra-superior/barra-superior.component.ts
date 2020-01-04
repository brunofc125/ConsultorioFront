import { Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

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

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.menu = sessionStorage.getItem("menu");
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
