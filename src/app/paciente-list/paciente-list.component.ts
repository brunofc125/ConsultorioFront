import { Component, OnInit } from '@angular/core';
import { Paciente } from '../paciente.type';
import { PacienteService } from '../paciente.service';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.css']
})
export class PacienteListComponent implements OnInit {
  dataSource: Paciente[];
  displayedColumns: string[] = ['nome', 'dataNasc', 'agendar', 'editar', 'excluir'];
  inputNome: string;

  constructor(
    private service: PacienteService
  ) { }

  ngOnInit() {
    this.inputNome = "";
    console.log(this.obterPacientes(this.inputNome));
  }

  obterPacientes(nome: string): void {
    this.service
      .getAll(nome)
      .subscribe(p => {
        this.dataSource = p;
        console.log(p);
      });
  }

  deletar(i: number): void{
    sessionStorage.removeItem("PacienteAtualizar");
    this.service
      .deletar(this.dataSource[i].id)
      .subscribe(
        () => {
          this.obterPacientes(this.inputNome);
        }
      );
  }

  atualizar(i: number): void{
    sessionStorage.removeItem("PacienteAtualizar");
    sessionStorage.setItem("PacienteAtualizar", JSON.stringify(this.dataSource[i]));
  }

  cadastrar(): void{
    sessionStorage.removeItem("PacienteAtualizar");
  }

  agendar(i: number): void{
    sessionStorage.removeItem("PacienteAgendar");
    sessionStorage.setItem("PacienteAgendar", JSON.stringify(this.dataSource[i]));
  }

}
