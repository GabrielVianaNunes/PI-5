package br.com.autogyn.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ItemOrdemServicoDTO {

    @NotBlank(message = "Descrição é obrigatória")
    private String descricao;

    @NotBlank(message = "Tipo do item é obrigatório (PECA ou SERVICO)")
    private String tipo; // PECA ou SERVICO

    @NotNull(message = "Quantidade é obrigatória")
    @Min(value = 1, message = "Quantidade deve ser no mínimo 1")
    private Integer quantidade;

    @NotNull(message = "Valor unitário é obrigatório")
    @DecimalMin(value = "0.00", message = "Valor unitário não pode ser negativo")
    private BigDecimal valorUnitario;

    // Apenas necessário para o tipo PECA
    private Long pecaEstoqueId;

    public ItemOrdemServicoDTO() {}

    public ItemOrdemServicoDTO(String descricao, String tipo, Integer quantidade, BigDecimal valorUnitario, Long pecaEstoqueId) {
        this.descricao = descricao;
        this.tipo = tipo;
        this.quantidade = quantidade;
        this.valorUnitario = valorUnitario;
        this.pecaEstoqueId = pecaEstoqueId;
    }

    // Getters e Setters

    public String getDescricao() { return descricao; }

    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getTipo() { return tipo; }

    public void setTipo(String tipo) { this.tipo = tipo; }

    public Integer getQuantidade() { return quantidade; }

    public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }

    public BigDecimal getValorUnitario() { return valorUnitario; }

    public void setValorUnitario(BigDecimal valorUnitario) { this.valorUnitario = valorUnitario; }

    public Long getPecaEstoqueId() { return pecaEstoqueId; }

    public void setPecaEstoqueId(Long pecaEstoqueId) { this.pecaEstoqueId = pecaEstoqueId; }
}
