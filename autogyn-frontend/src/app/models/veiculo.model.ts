export interface Cliente {
  id: number;
  nome: string;
}

export interface Veiculo {
  id?: number;
  placa: string;
  marca: string;
  modelo: string;
  ano: number;
  tipo: string;
  clienteId: number;
  cliente?: Cliente; 
}
