package br.com.autogyn.observer.listeners;

import org.springframework.stereotype.Component;

import br.com.autogyn.observer.pagamentoEvent;

@Component
public class auditorialListener implements pagamentoListener {

    public void atualizar(pagamentoEvent event) {
        String log = String.format("[AUDITORIA] %s - Pagamento %d: %s (%s)",
                event.getDataEvento(),
                event.getPagamento().getId(),
                event.getTipoEvento(),
                event.getPagamento().getValorPago());
        System.out.println(log); // Persista no BD ou arquivo
    }

    @Override
    public void atualizar(Object event) {
        throw new UnsupportedOperationException("Unimplemented method 'atualizar'");
    }
}
