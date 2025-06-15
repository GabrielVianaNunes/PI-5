export interface PecaEstoque {
  id: number;
  nome: string;
  valorUnitario: number;
  quantidade: number;
  codigo: string;
  estoqueMinimo?: number;
  descricao?: string;
}
