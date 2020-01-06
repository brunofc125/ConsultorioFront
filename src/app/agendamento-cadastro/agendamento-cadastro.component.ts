import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgendamentoService } from '../agendamento.service';
import { FormBuilder } from '@angular/forms';
import { Paciente } from '../paciente.type';
import { UsuarioCompleto } from '../usuario.type';
import { Agendamento } from '../agendamento.type';

@Component({
  selector: 'app-agendamento-cadastro',
  templateUrl: './agendamento-cadastro.component.html',
  styleUrls: ['./agendamento-cadastro.component.css']
})
export class AgendamentoCadastroComponent implements OnInit, OnDestroy {
  checkoutForm;
  isAgendamento: boolean;
  idAtualizar: string;
  paciente: Paciente;
  name: string;
  usuario: UsuarioCompleto;

  constructor(
    private service: AgendamentoService,
    private formBuilder: FormBuilder
  ) {
    var aString = sessionStorage.getItem("AgendamentoAtualizar");
    this.usuario = JSON.parse(localStorage.getItem("UsuarioLogado"));
    this.paciente = JSON.parse(sessionStorage.getItem("PacienteAgendar"));
    sessionStorage.removeItem("PacienteAgendar");
    if(this.paciente == null)
      this.name = "";
    else
      this.name = this.paciente.nome;
    if(aString != null){
      var a = JSON.parse(aString);
      this.idAtualizar = a.id;
      this.checkoutForm = this.formBuilder.group({
        inputHorarioInicial: a.horarioInicial.toString(),
        inputHorarioFinal: a.horarioFinal.toString(),
        inputObservacao: a.observacao
      });
      this.isAgendamento = false;
    } else{
      this.checkoutForm = this.formBuilder.group({
        inputHorarioInicial: '',
        inputHorarioFinal: '',
        inputObservacao: ''
      });
      this.isAgendamento = true;
    }
  }

  ngOnInit() {
    sessionStorage.setItem("menu", "Agendamento");
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem("AgendamentoAtualizar");
    
  }

  onSubmit(customerData){
    if(this.paciente!= null && this.usuario != null){
      if(this.isAgendamento){
        var a = new Agendamento(this.usuario.id, this.paciente.id, customerData.inputHorarioInicial, customerData.inputHorarioFinal, customerData.inputObservacao);
        this.service.cadastrar(a).subscribe(
          success => {  if(success){
                          alert("Cadastro realizado!");
                          sessionStorage.removeItem("AgendamentoAtualizar");
                          sessionStorage.removeItem("PacienteAgendar");
                          this.name = "";
                          this.checkoutForm.reset();
                        } else{
                          alert("Erro no Cadastro!")
                        }
                    },
          error => { console.log(error); alert("Erro no Cadastro!") }
        );
      } else{
        var a = new Agendamento(this.usuario.id, this.paciente.id, customerData.inputHorarioInicial, customerData.inputHorarioFinal, customerData.inputObservacao, this.idAtualizar);
        this.service.atualizar(a).subscribe(
          success => { if(success){
                          alert("Atualização realizada!");
                          sessionStorage.removeItem("AgendamentoAtualizar");
                          sessionStorage.removeItem("PacienteAgendar");
                          this.name = "";
                          this.checkoutForm.reset();
                        } else{
                          alert("Erro na Atualização!")
                        }
                      },
          error => { console.log(error); alert("Erro na Atualização!") }
        )
      }
    } else{
      alert("Erro no Cadastro")
    }
    
  }
}
