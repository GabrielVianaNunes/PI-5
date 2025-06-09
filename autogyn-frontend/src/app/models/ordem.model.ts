// src/app/models/ordem.model.ts

export interface ItemOrdemServico {
  descricao: string;
  quantidade: number;
  valorUnitario: number;          // Renomeado para coincidir com o backend
  tipoItem: 'PECA' | 'SERVICO';
  pecaEstoqueId?: number;         // Apenas se tipoItem for 'PECA'
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
  valorTotal?: number;            // Útil para exibição ou conferência
}
