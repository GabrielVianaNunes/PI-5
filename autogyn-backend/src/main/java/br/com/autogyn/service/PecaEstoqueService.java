package br.com.autogyn.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.autogyn.model.PecaEstoque;
import br.com.autogyn.repository.PecaEstoqueRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class PecaEstoqueService {

    private final PecaEstoqueRepository pecaEstoqueRepository;

    public PecaEstoqueService(PecaEstoqueRepository pecaEstoqueRepository) {
        this.pecaEstoqueRepository = pecaEstoqueRepository;
    }

    public List<PecaEstoque> listarTodas() {
        return pecaEstoqueRepository.findAll();
    }

    public PecaEstoque buscarPorId(Long id) {
        return pecaEstoqueRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Peça não encontrada com ID: " + id));
    }

    public PecaEstoque adicionar(PecaEstoque peca) {
        if (pecaEstoqueRepository.existsByCodigo(peca.getCodigo())) {
            throw new IllegalArgumentException("Já existe uma peça com o código: " + peca.getCodigo());
        }
        return pecaEstoqueRepository.save(peca);
    }

    public PecaEstoque atualizar(Long id, PecaEstoque novaPeca) {
        PecaEstoque existente = buscarPorId(id);

        existente.setNome(novaPeca.getNome());
        existente.setCodigo(novaPeca.getCodigo());
        existente.setQuantidade(novaPeca.getQuantidade());
        existente.setValorUnitario(novaPeca.getValorUnitario());
        existente.setDescricao(novaPeca.getDescricao());

        return pecaEstoqueRepository.save(existente);
    }

    public void remover(Long id) {
        if (!pecaEstoqueRepository.existsById(id)) {
            throw new EntityNotFoundException("Peça não encontrada com ID: " + id);
        }
        pecaEstoqueRepository.deleteById(id);
    }

    public void ajustarQuantidade(Long id, int quantidadeDelta) {
        PecaEstoque peca = buscarPorId(id);
        int novaQuantidade = peca.getQuantidade() + quantidadeDelta;
        if (novaQuantidade < 0) {
            throw new IllegalArgumentException("Quantidade insuficiente em estoque para a operação.");
        }
        peca.setQuantidade(novaQuantidade);
        pecaEstoqueRepository.save(peca);
    }
}
