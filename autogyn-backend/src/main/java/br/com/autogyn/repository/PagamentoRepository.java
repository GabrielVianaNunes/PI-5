package br.com.autogyn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.autogyn.model.Pagamento;

@Repository
public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {
    
    // Busca o pagamento associado a uma ordem de serviço
    Pagamento findByOrdemDeServicoId(Long ordemDeServicoId);

    boolean existsByOrdemDeServicoId(Long ordemDeServicoId);
}
