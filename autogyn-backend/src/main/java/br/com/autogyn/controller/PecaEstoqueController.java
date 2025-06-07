package br.com.autogyn.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.autogyn.model.PecaEstoque;
import br.com.autogyn.service.PecaEstoqueService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/pecas")
@CrossOrigin(origins = "*")
public class PecaEstoqueController {

    private final PecaEstoqueService pecaEstoqueService;

    public PecaEstoqueController(PecaEstoqueService pecaEstoqueService) {
        this.pecaEstoqueService = pecaEstoqueService;
    }

    @GetMapping
    public ResponseEntity<List<PecaEstoque>> listarTodas() {
        return ResponseEntity.ok(pecaEstoqueService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PecaEstoque> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(pecaEstoqueService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<PecaEstoque> adicionar(@Valid @RequestBody PecaEstoque peca) {
        return ResponseEntity.ok(pecaEstoqueService.adicionar(peca));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PecaEstoque> atualizar(@PathVariable Long id, @Valid @RequestBody PecaEstoque peca) {
        return ResponseEntity.ok(pecaEstoqueService.atualizar(id, peca));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        pecaEstoqueService.remover(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/ajustar-quantidade")
    public ResponseEntity<Void> ajustarQuantidade(@PathVariable Long id, @RequestParam int quantidadeDelta) {
        pecaEstoqueService.ajustarQuantidade(id, quantidadeDelta);
        return ResponseEntity.noContent().build();
    }
}
