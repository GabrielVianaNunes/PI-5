package br.com.autogyn.strategy;

import java.math.BigDecimal;
import java.util.List;

import br.com.autogyn.model.ItemOrdemServico;

public interface CalculoValorStrategy {
    BigDecimal calcularValorTotal(List<ItemOrdemServico> itens);
}
