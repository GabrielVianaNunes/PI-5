// src/app/models/veiculo.model.ts

export interface Veiculo {
  id?: number;
  placa: string;
  marca: string;
  modelo: string;
  ano: number;
  tipo: string;
  clienteId: number;
}
