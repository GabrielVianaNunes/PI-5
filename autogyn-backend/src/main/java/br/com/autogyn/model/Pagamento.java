package br.com.autogyn.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "pagamentos")
public class Pagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @JoinColumn(name = "ordem_servico_id", unique = true)
    private OrdemDeServico ordemDeServico;

    @NotBlank(message = "Forma de pagamento é obrigatória")
    private String formaPagamento; // Ex: DINHEIRO, CARTAO_CREDITO, PIX, etc.

    @NotNull(message = "Valor pago é obrigatório")
    @DecimalMin(value = "0.00", message = "Valor pago deve ser positivo")
    @Column(name = "valor_pago", precision = 10, scale = 2)
    private BigDecimal valorPago;

    @Column(name = "data_pagamento", nullable = false)
    private LocalDateTime dataPagamento;

    @Column(name = "status", nullable = false)
    private String status; // Ex: PAGO, PENDENTE, CANCELADO

    @Column(name = "troco", precision = 10, scale = 2)
    private BigDecimal troco;

    public Pagamento() {
        this.dataPagamento = LocalDateTime.now();
        this.status = "PAGO";
    }

    // Getters e Setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public OrdemDeServico getOrdemDeServico() { return ordemDeServico; }

    public void setOrdemDeServico(OrdemDeServico ordemDeServico) { this.ordemDeServico = ordemDeServico; }

    public String getFormaPagamento() { return formaPagamento; }

    public void setFormaPagamento(String formaPagamento) { this.formaPagamento = formaPagamento; }

    public BigDecimal getValorPago() { return valorPago; }

    public void setValorPago(BigDecimal valorPago) { this.valorPago = valorPago; }

    public LocalDateTime getDataPagamento() { return dataPagamento; }

    public void setDataPagamento(LocalDateTime dataPagamento) { this.dataPagamento = dataPagamento; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    public BigDecimal getTroco() { return troco; }

    public void setTroco(BigDecimal troco) { this.troco = troco; }
}
