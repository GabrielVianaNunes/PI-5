package br.com.autogyn.observer;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import br.com.autogyn.observer.listeners.pagamentoListener;

@Component
public class pagmentoSubject<PagamentoListener> {

    private final List<Object> listeners = new ArrayList<>();

    public void adicionarListener(PagamentoListener listener) {
        listeners.add(listener);
    }

    public void removerListener(PagamentoListener listener) {
        listeners.remove(listener);
    }

    public void notificarListeners(pagamentoListener event) {
        listeners.forEach(listener -> ((pagamentoListener) listener).atualizar(event));
    }
}
