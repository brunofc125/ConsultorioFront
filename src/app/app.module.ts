import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatSelectModule,
  MatGridListModule
} from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { BarraSuperiorComponent } from './barra-superior/barra-superior.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginService } from './login/login.service';
import { PacienteListComponent } from './paciente-list/paciente-list.component';
import { PacienteCadastroComponent } from './paciente-cadastro/paciente-cadastro.component';
import { AgendamentoListComponent } from './agendamento-list/agendamento-list.component';
import { AgendamentoCadastroComponent } from './agendamento-cadastro/agendamento-cadastro.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BarraSuperiorComponent,
    PacienteListComponent,
    PacienteCadastroComponent,
    AgendamentoListComponent,
    AgendamentoCadastroComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
