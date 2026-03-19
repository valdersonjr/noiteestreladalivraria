export interface Pessoa {
  id: number;
  nome: string;
  telefone: string;
  email: string | null;
  criado_em: string;
}

export interface PessoaCreate {
  nome: string;
  telefone: string;
  email?: string;
}
