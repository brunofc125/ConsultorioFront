export class Paciente{
    id: string;
    nome: string;
    dataNasc: Date;

    constructor(nome: string, dataNasc: Date)
    constructor(nome: string, dataNasc: Date, id: string)
    constructor(nome: string, dataNasc: Date, id?: string){
        this.id = id;
        this.nome = nome;
        this.dataNasc = dataNasc;
    }

}