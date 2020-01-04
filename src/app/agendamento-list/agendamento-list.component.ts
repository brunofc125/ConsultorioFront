import { Component, OnInit } from '@angular/core';
import { Agendamento } from '../agendamento.type';
import { AgendamentoService } from '../agendamento.service';

@Component({
  selector: 'app-agendamento-list',
  templateUrl: './agendamento-list.component.html',
  styleUrls: ['./agendamento-list.component.css']
})
export class AgendamentoListComponent implements OnInit {
  dataSource: Agendamento[];
  displayedColumns: string[] = ['nomePaciente', 'horarioInicial', 'horarioFinal', 'editar', 'excluir'];
  buscarSelect;
  inputData: Date;
  inputNome: string;

  constructor(
    private service: AgendamentoService
  ) { }

  ngOnInit() {
    this.inputNome = "";
    console.log(this.obterAgendamentosNome(this.inputNome));
    this.buscarSelect = 'nome';
  }

  obterAgendamentos(nome: string, data: Date): void{
    if(this.buscarSelect == 'nome'){
      this.obterAgendamentosNome(nome);
    } else{
      this.obterAgendamentosData(data);
    }
  }

  obterAgendamentosNome(nome: string): void{
    this.service
      .getAllNome(nome)
      .subscribe(a => {
        this.dataSource = a;
        console.log(a);
      });
  }

  obterAgendamentosData(data: Date): void{
    console.log(data);
    this.service
    .getAllData(data)
    .subscribe(a => {
      this.dataSource = a;
      console.log(a);
    });
  }

  deletar(i: number): void{
    console.log(this.dataSource[i].id);
    this.service
      .deletar(this.dataSource[i].id)
      .subscribe(
        () => {
          this.obterAgendamentos(this.inputNome, this.inputData);
        }
      );
  }

  atualizar(i: number): void{
    sessionStorage.removeItem("PacienteAgendar");
    sessionStorage.setItem("PacienteAgendar", JSON.stringify(this.dataSource[i].paciente));
    sessionStorage.removeItem("AgendamentoAtualizar");
    sessionStorage.setItem("AgendamentoAtualizar", JSON.stringify(this.dataSource[i]));
  }

}