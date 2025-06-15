package br.com.autogyn.strategy;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Component;

import br.com.autogyn.model.ItemOrdemServico;

@Component("fidelidade")
public class CalculoDescontoFidelidade implements CalculoValorStrategy {

    @Override
    public BigDecimal calcularValorTotal(List<ItemOrdemServico> itens) {
        BigDecimal total = itens.stream()
                .map(ItemOrdemServico::getValorTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (itens.size() > 3) {
            return total.multiply(BigDecimal.valueOf(0.90)); // aplica 10% de desconto
        }

        return total;
    }
}
