import { Paciente } from './paciente.type';

export class Agendamento{
    id: string;
    idUsuario: string;
    idPaciente: string;
    horarioInicial: Date;
    horarioFinal: Date;
    observacao: string;
    paciente: Paciente;

    constructor(idUsuario: string, idPaciente: string, horarioInicial: Date, horarioFinal: Date, observacao: string)
    constructor(idUsuario: string, idPaciente: string, horarioInicial: Date, horarioFinal: Date, observacao: string, id: string)
    constructor(idUsuario: string, idPaciente: string, horarioInicial: Date, horarioFinal: Date, observacao: string, id: string, paciente: Paciente)
    constructor(idUsuario: string, idPaciente: string, horarioInicial: Date, horarioFinal: Date, observacao: string,  id?: string, paciente?: Paciente){
        this.id = id;
        this.idUsuario = idUsuario;
        this.idPaciente = idPaciente;
        this.horarioInicial = horarioInicial;
        this.horarioFinal = horarioFinal;
        this.observacao = observacao;
        this.paciente = paciente;
    }

}