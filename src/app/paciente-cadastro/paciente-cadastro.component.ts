import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Paciente } from '../paciente.type';
import { PacienteService } from '../paciente.service';

@Component({
  selector: 'app-paciente-cadastro',
  templateUrl: './paciente-cadastro.component.html',
  styleUrls: ['./paciente-cadastro.component.css']
})
export class PacienteCadastroComponent implements OnInit {
  checkoutForm;
  isCadastro: boolean;
  idAtualizar: string;

  constructor(
    private service: PacienteService,
    private formBuilder: FormBuilder
  ) {
    var pString = sessionStorage.getItem("PacienteAtualizar");
    if(pString != null){
      var p = JSON.parse(sessionStorage.getItem("PacienteAtualizar"));
      this.idAtualizar = p.id;
      this.checkoutForm = this.formBuilder.group({
        inputNome: p.nome,
        inputDataNasc: p.dataNasc.toString().substring(0,10)
      });
      this.isCadastro = false;
    } else{
      this.checkoutForm = this.formBuilder.group({
        inputNome: '',
        inputDataNasc: ''
      });
      this.isCadastro = true;
    }
  }

  ngOnInit() {
  }

  onSubmit(customerData){
    if(this.isCadastro){
      var p = new Paciente(customerData.inputNome, customerData.inputDataNasc);
      this.service.cadastrar(p).subscribe(
        success => { console.log(success); alert("Cadastro realizado!") },
        error => { console.log(error); alert("Erro no Cadastro!") }
      );
    } else {
      var p = new Paciente(customerData.inputNome, customerData.inputDataNasc, this.idAtualizar);
      this.service.atualizar(p).subscribe(
        success => { console.log(success); alert("Atualização realizada!"); sessionStorage.removeItem("PacienteAtualizar"); },
        error => { console.log(error); alert("Erro na atualização!") }
      );
    }
    this.checkoutForm.reset();
  }

}