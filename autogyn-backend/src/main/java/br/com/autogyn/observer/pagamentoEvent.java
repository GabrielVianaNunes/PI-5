package br.com.autogyn.observer;

import java.time.LocalDateTime;

import br.com.autogyn.model.Pagamento;

public class pagamentoEvent {

    private final Pagamento pagamento;
    private final String tipoEvento; // "REGISTRO", "CANCELAMENTO", "ESTORNO"
    private final LocalDateTime dataEvento;

    public pagamentoEvent(Pagamento pagamento, String tipoEvento) {
        this.pagamento = pagamento;
        this.tipoEvento = tipoEvento;
        this.dataEvento = LocalDateTime.now();
    }

    // Getters
    public Pagamento getPagamento() {
        return pagamento;
    }

    public String getTipoEvento() {
        return tipoEvento;
    }

    public LocalDateTime getDataEvento() {
        return dataEvento;
    }
}
