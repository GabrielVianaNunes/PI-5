// src/app/models/ordem.model.ts

export interface ItemOrdemServico {
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  tipo: 'PECA' | 'SERVICO';
  pecaEstoqueId?: number;
}

export interface OrdemServico {
  id?: number;
  veiculoId: number;
  dataAbertura: string;          // Usado no DTO no backend
  dataFechamento?: string;
  status: 'ABERTA' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';
  itens: ItemOrdemServico[];
  observacoes?: string;
  valorTotal?: number;
}
