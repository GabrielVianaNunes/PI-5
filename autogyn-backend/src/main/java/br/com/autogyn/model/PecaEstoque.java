package br.com.autogyn.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "pecas_estoque")
public class PecaEstoque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome da peça é obrigatório")
    @Column(nullable = false, unique = true)
    private String nome;

    @NotNull(message = "A quantidade é obrigatória")
    @Min(value = 0, message = "A quantidade não pode ser negativa")
    private Integer quantidade;

    @NotNull(message = "O valor unitário é obrigatório")
    @DecimalMin(value = "0.00", message = "O valor deve ser positivo")
    @Column(name = "valor_unitario", precision = 10, scale = 2)
    private BigDecimal valorUnitario;

    @Pattern(regexp = "^P-?\\d{3,4}[A-Z]{0,2}$", message = "Código de peça inválido (ex: P-123 ou P123A)")
    @Column(name = "codigo", unique = true)
    private String codigo;

    // restringindo a entrada a uma linguagem reconhecida por este Autômato Finito Determinístico (AFD):
    //Σ = {P, -, 0–9, A–Z}
    //q0 --P--> q1 --[-]?--> q2 --[0-9]{3,4}--> q3 --[A-Z]{0,2}--> qf

    @Column(name = "estoque_minimo")
    private Integer estoqueMinimo;

    @Column(length = 500)
    private String descricao;

    // Construtor padrão
    public PecaEstoque() {}

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
