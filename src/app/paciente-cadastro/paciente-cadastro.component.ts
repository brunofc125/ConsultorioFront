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
    sessionStorage.removeItem("PacienteAtualizar");
    if(pString != null){
      var p = JSON.parse(pString);
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
        success => { 
            if(success){
              alert("Cadastro realizado!");
              this.checkoutForm.reset();
            } else{
              alert("Erro no Cadastro!");
            }
          },
        error => { console.log(error); alert("Erro no Cadastro!") }
      );
    } else {
      var p = new Paciente(customerData.inputNome, customerData.inputDataNasc, this.idAtualizar);
      this.service.atualizar(p).subscribe(
        success => { 
            if(success){
              alert("Atualização realizada!");
            } else{
              alert("Erro na atualização!");
            }
          },
        error => { console.log(error); alert("Erro na atualização!") }
      );
    }
    
  }

}