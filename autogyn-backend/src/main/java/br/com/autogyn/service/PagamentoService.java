package br.com.autogyn.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import br.com.autogyn.dto.PagamentoDTO;
import br.com.autogyn.model.OrdemDeServico;
import br.com.autogyn.model.Pagamento;
import br.com.autogyn.repository.OrdemDeServicoRepository;
import br.com.autogyn.repository.PagamentoRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class PagamentoService {

    private final PagamentoRepository pagamentoRepository;
    private final OrdemDeServicoRepository ordemRepository;

    public PagamentoService(PagamentoRepository pagamentoRepository, OrdemDeServicoRepository ordemRepository) {
        this.pagamentoRepository = pagamentoRepository;
        this.ordemRepository = ordemRepository;
    }

    public List<Pagamento> listarTodos() {
        return pagamentoRepository.findAll();
    }

    public Pagamento buscarPorId(Long id) {
        return pagamentoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pagamento não encontrado com ID: " + id));
    }

    public Pagamento registrarPagamento(PagamentoDTO dto) {
        OrdemDeServico ordem = ordemRepository.findById(dto.getOrdemDeServicoId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Ordem de Serviço não encontrada com ID: " + dto.getOrdemDeServicoId()));

        Pagamento pagamento = new Pagamento();
        pagamento.setOrdemDeServico(ordem);
        pagamento.setValorPago(dto.getValorPago());
        pagamento.setFormaPagamento(dto.getFormaPagamento());

        // Usa a data enviada ou define como agora
        LocalDateTime dataPagamento = dto.getDataPagamento() != null
                ? dto.getDataPagamento()
                : LocalDateTime.now();
        pagamento.setDataPagamento(dataPagamento);

        // Lógica de status e troco
        BigDecimal valorOS = ordem.getValorTotal();
        BigDecimal valorPago = dto.getValorPago();

        if (valorPago.compareTo(valorOS) >= 0) {
            pagamento.setStatus("PAGO");
            pagamento.setTroco(valorPago.subtract(valorOS));
        } else {
            pagamento.setStatus("PENDENTE");
            pagamento.setTroco(BigDecimal.ZERO);
        }

        return pagamentoRepository.save(pagamento);
    }

    public void deletar(Long id) {
        if (!pagamentoRepository.existsById(id)) {
            throw new EntityNotFoundException("Pagamento não encontrado com ID: " + id);
        }
        pagamentoRepository.deleteById(id);
    }
}
