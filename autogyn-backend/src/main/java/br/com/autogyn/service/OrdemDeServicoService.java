package br.com.autogyn.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import br.com.autogyn.dto.ItemOrdemServicoDTO;
import br.com.autogyn.dto.OrdemDeServicoDTO;
import br.com.autogyn.model.ItemOrdemServico;
import br.com.autogyn.model.OrdemDeServico;
import br.com.autogyn.model.PecaEstoque;
import br.com.autogyn.model.Veiculo;
import br.com.autogyn.repository.ItemOrdemServicoRepository;
import br.com.autogyn.repository.OrdemDeServicoRepository;
import br.com.autogyn.repository.PecaEstoqueRepository;
import br.com.autogyn.repository.VeiculoRepository;
import br.com.autogyn.strategy.CalculoValorStrategy;
import jakarta.persistence.EntityNotFoundException;

@Service
public class OrdemDeServicoService {

    private final OrdemDeServicoRepository ordemRepository;
    private final ItemOrdemServicoRepository itemRepository;
    private final VeiculoRepository veiculoRepository;
    private final PecaEstoqueRepository pecaEstoqueRepository;
    private final CalculoValorStrategy calculoValorStrategy;

    public OrdemDeServicoService(
            OrdemDeServicoRepository ordemRepository,
            ItemOrdemServicoRepository itemRepository,
            VeiculoRepository veiculoRepository,
            PecaEstoqueRepository pecaEstoqueRepository,
            @Qualifier("fidelidade") CalculoValorStrategy calculoValorStrategy) {
        this.ordemRepository = ordemRepository;
        this.itemRepository = itemRepository;
        this.veiculoRepository = veiculoRepository;
        this.pecaEstoqueRepository = pecaEstoqueRepository;
        this.calculoValorStrategy = calculoValorStrategy;
    }

    public List<OrdemDeServico> listarTodas() {
        return ordemRepository.findAll();
    }

    public OrdemDeServico buscarPorId(Long id) {
        return ordemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ordem de Serviço não encontrada com ID: " + id));
    }

    public OrdemDeServico criar(OrdemDeServicoDTO dto) {
        Veiculo veiculo = veiculoRepository.findById(dto.getVeiculoId())
            .orElseThrow(() -> new EntityNotFoundException("Veículo não encontrado com ID: " + dto.getVeiculoId()));

        OrdemDeServico ordem = new OrdemDeServico();
        ordem.setVeiculo(veiculo);
        ordem.setCliente(veiculo.getCliente());
        ordem.setDataAbertura(dto.getDataAbertura().atStartOfDay());
        ordem.setDataFechamento(dto.getDataFechamento().atStartOfDay());
        ordem.setStatus(dto.getStatus());

        List<ItemOrdemServico> itens = new ArrayList<>();

        for (ItemOrdemServicoDTO itemDTO : dto.getItens()) {
            ItemOrdemServico item = new ItemOrdemServico();
            item.setDescricao(itemDTO.getDescricao());
            item.setTipo(itemDTO.getTipo());
            item.setQuantidade(itemDTO.getQuantidade());
            item.setOrdemDeServico(ordem);

            BigDecimal valorUnitario;

            if ("PECA".equalsIgnoreCase(itemDTO.getTipo())) {
                if (itemDTO.getPecaEstoqueId() == null) {
                    throw new IllegalArgumentException("ID da peça em estoque é obrigatório para itens do tipo PECA.");
                }

                PecaEstoque peca = pecaEstoqueRepository.findById(itemDTO.getPecaEstoqueId())
                        .orElseThrow(() -> new EntityNotFoundException("Peça não encontrada com ID: " + itemDTO.getPecaEstoqueId()));

                if (peca.getQuantidade() < itemDTO.getQuantidade()) {
                    throw new IllegalArgumentException("Estoque insuficiente para a peça: " + peca.getNome());
                }

                peca.setQuantidade(peca.getQuantidade() - itemDTO.getQuantidade());
                pecaEstoqueRepository.save(peca);

                valorUnitario = peca.getValorUnitario();
            } else {
                valorUnitario = itemDTO.getValorUnitario();
            }

            item.setValorUnitario(valorUnitario);

            BigDecimal subtotal = valorUnitario.multiply(BigDecimal.valueOf(item.getQuantidade().longValue()));
            item.setValorTotal(subtotal);

            itens.add(item);
        }

        // Aplicação do Strategy para cálculo de valor total
        BigDecimal valorTotal = calculoValorStrategy.calcularValorTotal(itens);
        ordem.setValorTotal(valorTotal);
        ordem.setItens(itens);

        ordem = ordemRepository.save(ordem);
        itemRepository.saveAll(itens);

        return ordem;
    }

    public void deletar(Long id) {
        if (!ordemRepository.existsById(id)) {
            throw new EntityNotFoundException("Ordem de Serviço não encontrada com ID: " + id);
        }
        ordemRepository.deleteById(id);
    }
}
