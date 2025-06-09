// src/app/models/ordem.model.ts

export interface ItemOrdemServico {
  descricao: string;
  quantidade: number;
  precoUnitario: number;
  tipoItem: 'PECA' | 'SERVICO';
  pecaEstoqueId?: number; // só se for tipo PECA
}

export interface OrdemServico {
  id?: number;
  clienteId: number;
  veiculoId: number;
  dataEntrada: string;
  dataConclusao?: string;
  status: 'ABERTA' | 'EM_ANDAMENTO' | 'FINALIZADA' | 'CANCELADA';
  itens: ItemOrdemServico[];
  observacoes?: string;
}
