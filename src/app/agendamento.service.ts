import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Agendamento } from './agendamento.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  applicationUrl = environment.applicationUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllData(data: Date): Observable<Agendamento[]>{
    return this.httpClient.get<Agendamento[]>(`${this.applicationUrl}/api/agendamento/search?data=${data}`);
  }

  getAllNome(nome: string): Observable<Agendamento[]>{
    return this.httpClient.get<Agendamento[]>(`${this.applicationUrl}/api/agendamento/searchNome?nomePaciente=${nome}`);
  }


  cadastrar(agendamento: Agendamento): Observable<Agendamento>{
    return this.httpClient.post<Agendamento>(`${this.applicationUrl}/api/agendamento`, agendamento);
  }

  atualizar(agendamento: Agendamento): Observable<Agendamento>{
    return this.httpClient.put<Agendamento>(`${this.applicationUrl}/api/agendamento`, agendamento);
  }

  deletar(id: string): Observable<Agendamento>{
    return this.httpClient.delete<Agendamento>(`${this.applicationUrl}/api/agendamento?id=${id}`);
  }

}
