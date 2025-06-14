package br.com.autogyn.observer.listeners;

import org.springframework.stereotype.Component;

import br.com.autogyn.observer.pagamentoEvent;

@Component
public class notificacaoListener implements pagamentoListener {

    public void atualizar(pagamentoEvent event) {
        if (event.getTipoEvento().equals("REGISTRO")) {
            enviarNotificacao(); // Método fictício
        }
    }

    private void enviarNotificacao() {
        throw new UnsupportedOperationException("Unimplemented method 'enviarNotificacao'");
    }

    @Override
    public void atualizar(Object event) {
        throw new UnsupportedOperationException("Unimplemented method 'atualizar'");
    }
}
