package br.com.autogyn.dto;

import java.math.BigDecimal;

public class PecaEstoqueDTO {

    private Long id;
    private String nome;
    private Integer quantidade;
    private BigDecimal valorUnitario;
    private String codigo;
    private Integer estoqueMinimo;
    private String descricao; // Novo campo adicionado

    public PecaEstoqueDTO() {}

    public PecaEstoqueDTO(Long id, String nome, Integer quantidade, BigDecimal valorUnitario, String codigo, Integer estoqueMinimo, String descricao) {
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
        this.valorUnitario = valorUnitario;
        this.codigo = codigo;
        this.estoqueMinimo = estoqueMinimo;
        this.descricao = descricao;
    }

    // Getters e Setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }

    public void setNome(String nome) { this.nome = nome; }

    public Integer getQuantidade() { return quantidade; }

    public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }

    public BigDecimal getValorUnitario() { return valorUnitario; }

    public void setValorUnitario(BigDecimal valorUnitario) { this.valorUnitario = valorUnitario; }

    public String getCodigo() { return codigo; }

    public void setCodigo(String codigo) { this.codigo = codigo; }

    public Integer getEstoqueMinimo() { return estoqueMinimo; }

    public void setEstoqueMinimo(Integer estoqueMinimo) { this.estoqueMinimo = estoqueMinimo; }

    public String getDescricao() { return descricao; }

    public void setDescricao(String descricao) { this.descricao = descricao; }
}
