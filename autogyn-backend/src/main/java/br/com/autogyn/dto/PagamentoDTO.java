package br.com.autogyn.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PagamentoDTO {

    private Long id;
    private Long ordemDeServicoId;
    private BigDecimal valorPago;
    private String formaPagamento; // Ex: DINHEIRO, CARTAO, PIX
    private LocalDateTime dataPagamento;
    private String status; // Ex: PENDENTE, PAGO, CANCELADO
    private BigDecimal troco; // <-- NOVO CAMPO

    public PagamentoDTO() {}

    public PagamentoDTO(Long id, Long ordemDeServicoId, BigDecimal valorPago, String formaPagamento,
                        LocalDateTime dataPagamento, String status, BigDecimal troco) {
        this.id = id;
        this.ordemDeServicoId = ordemDeServicoId;
        this.valorPago = valorPago;
        this.formaPagamento = formaPagamento;
        this.dataPagamento = dataPagamento;
        this.status = status;
        this.troco = troco;
    }

    // Getters e Setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Long getOrdemDeServicoId() { return ordemDeServicoId; }

    public void setOrdemDeServicoId(Long ordemDeServicoId) { this.ordemDeServicoId = ordemDeServicoId; }

    public BigDecimal getValorPago() { return valorPago; }

    public void setValorPago(BigDecimal valorPago) { this.valorPago = valorPago; }

    public String getFormaPagamento() { return formaPagamento; }

    public void setFormaPagamento(String formaPagamento) { this.formaPagamento = formaPagamento; }

    public LocalDateTime getDataPagamento() { return dataPagamento; }

    public void setDataPagamento(LocalDateTime dataPagamento) { this.dataPagamento = dataPagamento; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    public BigDecimal getTroco() { return troco; }

    public void setTroco(BigDecimal troco) { this.troco = troco; }
}
