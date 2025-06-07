package br.com.autogyn.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

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
import jakarta.persistence.EntityNotFoundException;

@Service
public class OrdemDeServicoService {

    private final OrdemDeServicoRepository ordemRepository;
    private final ItemOrdemServicoRepository itemRepository;
    private final VeiculoRepository veiculoRepository;
    private final PecaEstoqueRepository pecaEstoqueRepository;

    public OrdemDeServicoService(
            OrdemDeServicoRepository ordemRepository,
            ItemOrdemServicoRepository itemRepository,
            VeiculoRepository veiculoRepository,
            PecaEstoqueRepository pecaEstoqueRepository) {
        this.ordemRepository = ordemRepository;
        this.itemRepository = itemRepository;
        this.veiculoRepository = veiculoRepository;
        this.pecaEstoqueRepository = pecaEstoqueRepository;
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
        ordem.setDataAbertura(dto.getDataAbertura().atStartOfDay());
        ordem.setDataFechamento(dto.getDataFechamento().atStartOfDay());
        ordem.setStatus(dto.getStatus());

        List<ItemOrdemServico> itens = new ArrayList<>();
        BigDecimal valorTotal = BigDecimal.ZERO;

        for (ItemOrdemServicoDTO itemDTO : dto.getItens()) {
            ItemOrdemServico item = new ItemOrdemServico();
            item.setDescricao(itemDTO.getDescricao());
            item.setTipo(itemDTO.getTipo());
            item.setQuantidade(itemDTO.getQuantidade());
            item.setOrdemDeServico(ordem);

            BigDecimal valorUnitario;

            // Integração com o estoque
            if ("PECA".equalsIgnoreCase(itemDTO.getTipo())) {
                if (itemDTO.getPecaEstoqueId() == null) {
                    throw new IllegalArgumentException("ID da peça em estoque é obrigatório para itens do tipo PECA.");
                }

                PecaEstoque peca = pecaEstoqueRepository.findById(itemDTO.getPecaEstoqueId())
                        .orElseThrow(() -> new EntityNotFoundException("Peça não encontrada com ID: " + itemDTO.getPecaEstoqueId()));

                if (peca.getQuantidade() < itemDTO.getQuantidade()) {
                    throw new IllegalArgumentException("Estoque insuficiente para a peça: " + peca.getNome());
                }

                // Atualiza quantidade no estoque
                peca.setQuantidade(peca.getQuantidade() - itemDTO.getQuantidade());
                pecaEstoqueRepository.save(peca);

                valorUnitario = peca.getValorUnitario();
            } else {
                valorUnitario = itemDTO.getValorUnitario();
            }

            item.setValorUnitario(valorUnitario);

            BigDecimal subtotal = valorUnitario.multiply(BigDecimal.valueOf(item.getQuantidade().longValue()));
            item.setValorTotal(subtotal);
            valorTotal = valorTotal.add(subtotal);

            itens.add(item);
        }

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
