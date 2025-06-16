package br.com.autogyn.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrdemDeServicoResponseDTO {
    private Long id;
    private String clienteNome;
    private String veiculoPlaca;
    private String status;
    private LocalDateTime dataAbertura;
    private LocalDateTime dataFechamento;
    private BigDecimal valorTotal;
    private List<ItemResumoDTO> itens;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClienteNome() {
        return clienteNome;
    }

    public void setClienteNome(String clienteNome) {
        this.clienteNome = clienteNome;
    }

    public String getVeiculoPlaca() {
        return veiculoPlaca;
    }

    public void setVeiculoPlaca(String veiculoPlaca) {
        this.veiculoPlaca = veiculoPlaca;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDataAbertura() {
        return dataAbertura;
    }

    public void setDataAbertura(LocalDateTime dataAbertura) {
        this.dataAbertura = dataAbertura;
    }

    public LocalDateTime getDataFechamento() {
        return dataFechamento;
    }

    public void setDataFechamento(LocalDateTime dataFechamento) {
        this.dataFechamento = dataFechamento;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

    public List<ItemResumoDTO> getItens() {
        return itens;
    }

    public void setItens(List<ItemResumoDTO> itens) {
        this.itens = itens;
    }

}
