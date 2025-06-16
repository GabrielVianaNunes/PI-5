package br.com.autogyn.dto;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

public class OrdemDeServicoDTO {

    @NotNull(message = "ID do cliente é obrigatório")
    private Long clienteId;

    @NotNull(message = "ID do veículo é obrigatório")
    private Long veiculoId;

    @NotNull(message = "Data de abertura é obrigatória")
    @FutureOrPresent(message = "A data de abertura não pode ser no passado")
    private LocalDate dataAbertura;

    private LocalDate dataFechamento;

    @NotNull(message = "Status é obrigatório")
    private String status; // ABERTA, EM_ANDAMENTO, CONCLUIDA, CANCELADA

    @NotNull(message = "Lista de itens é obrigatória")
    private List<ItemOrdemServicoDTO> itens;

    public OrdemDeServicoDTO() {
    }

    public OrdemDeServicoDTO(Long clienteId, Long veiculoId, LocalDate dataAbertura, LocalDate dataFechamento, String status,
                             List<ItemOrdemServicoDTO> itens) {
        this.clienteId = clienteId;
        this.veiculoId = veiculoId;
        this.dataAbertura = dataAbertura;
        this.dataFechamento = dataFechamento;
        this.status = status;
        this.itens = itens;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public Long getVeiculoId() {
        return veiculoId;
    }

    public void setVeiculoId(Long veiculoId) {
        this.veiculoId = veiculoId;
    }

    public LocalDate getDataAbertura() {
        return dataAbertura;
    }

    public void setDataAbertura(LocalDate dataAbertura) {
        this.dataAbertura = dataAbertura;
    }

    public LocalDate getDataFechamento() {
        return dataFechamento;
    }

    public void setDataFechamento(LocalDate dataFechamento) {
        this.dataFechamento = dataFechamento;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<ItemOrdemServicoDTO> getItens() {
        return itens;
    }

    public void setItens(List<ItemOrdemServicoDTO> itens) {
        this.itens = itens;
    }
}
