// src/app/models/cliente.model.ts

export interface Cliente {
  id?: number;
  nome: string;
  tipoCliente: string;  // FISICA ou JURIDICA
  documento: string;    // CPF ou CNPJ
  telefone: string;
  endereco: string;
  email: string;
}
