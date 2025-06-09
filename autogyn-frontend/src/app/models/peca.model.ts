export interface PecaEstoque {
  id?: number;
  nome: string;
  quantidade: number;
  valorUnitario: number;
  codigo?: string;
  estoqueMinimo?: number;
  descricao?: string;
}
