// src/app/models/ordem.model.ts

export interface ItemOrdemServico {
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  tipo: 'PECA' | 'SERVICO';
  pecaEstoqueId?: number; // Apenas se tipo for 'PECA'
}

export interface OrdemServico {
  id?: number;
  clienteId: number;
  veiculoId: number;
  dataAbertura: string;
  dataFechamento?: string;
  status: 'ABERTA' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';
  itens: ItemOrdemServico[];
  observacoes?: string;
  valorTotal?: number;
}
