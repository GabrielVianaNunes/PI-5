export interface ItemResumoDTO {
  descricao: string;
  tipo: string;
  quantidade: number;
  valorUnitario: number;
  subtotal: number;
}

export interface OrdemDeServicoResponseDTO {
  id: number;
  clienteNome: string;
  veiculoPlaca: string;
  status: string;
  dataAbertura: string;
  dataFechamento: string;
  valorTotal: number;
  itens: ItemResumoDTO[];
}
