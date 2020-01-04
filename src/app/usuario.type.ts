export class Usuario{
    login: string;
    senha: string;

    constructor(login: string, senha: string){
        this.login = login;
        this.senha = senha;
    }

}

export class UsuarioCompleto{
    id: string;
    nome: string;
    login: string;
    senha: string;
    
    constructor(id: string, nome: string, login: string, senha: string){
        this.id = id;
        this.nome = nome;
        this.login = login;
        this.senha = senha;
    }
}