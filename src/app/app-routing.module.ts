import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BarraSuperiorComponent } from './barra-superior/barra-superior.component';
import { PacienteCadastroComponent } from './paciente-cadastro/paciente-cadastro.component';
import { PacienteListComponent } from './paciente-list/paciente-list.component';
import { AgendamentoListComponent } from './agendamento-list/agendamento-list.component';
import { AgendamentoCadastroComponent } from './agendamento-cadastro/agendamento-cadastro.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home_page', pathMatch: 'full' },
  { path: '', component: BarraSuperiorComponent,
    children:[
      { path: 'home_page', component: HomePageComponent},
      { path: 'paciente_list', component: PacienteListComponent },
      { path: 'paciente_cadastro', component: PacienteCadastroComponent },
      { path: 'agendamento_cadastro', component: AgendamentoCadastroComponent },
      { path: 'agendamento_list', component: AgendamentoListComponent }
    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
