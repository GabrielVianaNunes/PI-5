package br.com.autogyn.strategy;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Component;

import br.com.autogyn.model.ItemOrdemServico;

@Component("padrao")
public class CalculoValorPadrao implements CalculoValorStrategy {

    @Override
    public BigDecimal calcularValorTotal(List<ItemOrdemServico> itens) {
        return itens.stream()
                .map(ItemOrdemServico::getValorTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
