import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Paciente } from './paciente.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  applicationUrl = environment.applicationUrl;
  data;
  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(nome: string): Observable<Paciente[]>{
    return this.httpClient.get<Paciente[]>(`${this.applicationUrl}/api/paciente/search?nome=${nome}`);
  }

  cadastrar(paciente : Paciente){
    return this.httpClient.post<Paciente>(`${this.applicationUrl}/api/paciente`, paciente);
  }

  atualizar(paciente: Paciente){
    return this.httpClient.put<Paciente>(`${this.applicationUrl}/api/paciente`, paciente);
  }

  deletar(id: string): Observable<Paciente>{
    return this.httpClient.delete<Paciente>(`${this.applicationUrl}/api/paciente?id=${id}`);
  }

  getData(): any{
    return this.data;
  }

  setData(data: any){
    this.data = data;
  }

}