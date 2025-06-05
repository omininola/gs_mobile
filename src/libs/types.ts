export type Report = {
  id: number;
  cidade: string;
  modeloDrone: string;
  emailUsuario: string;
  descricao: string;
  data: string;
}

export type ReportCreate = {
  cidadeId: number;
  usuarioId: number;
  descricao: string;
}

export type User = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  relatorios: Report[];
}

export type UserRegister = {
  nome: string;
  email: string;
  senha: string;
}

export type UserLogin = {
  email: string;
  senha: string;
}

export type City = {
  id: number;
  nome: string;
}

export type ThingSpeakFeed = {
  entry_id: number;
  created_at: string;
  field1: string,
  field2: string,
  field3: string,
  field4: string,
}