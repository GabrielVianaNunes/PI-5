package br.com.autogyn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.autogyn.model.PecaEstoque;

@Repository
public interface PecaEstoqueRepository extends JpaRepository<PecaEstoque, Long> {
    
    // Consulta opcional: buscar por código da peça
    PecaEstoque findByCodigo(String codigo);

    // Consulta opcional: verificar se existe uma peça com determinado código
    boolean existsByCodigo(String codigo);
}
