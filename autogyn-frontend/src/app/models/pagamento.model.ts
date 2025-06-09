// src/app/models/pagamento.model.ts

export interface Pagamento {
  id?: number;
  ordemDeServicoId: number;
  valorPago: number;
  formaPagamento: 'DINHEIRO' | 'PIX' | 'CARTAO_CREDITO' | 'CARTAO_DEBITO';
  dataPagamento?: string; // ISO string
  status?: 'PAGO' | 'PENDENTE' | 'CANCELADO';
  troco?: number;
}
