package br.com.autogyn.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.autogyn.dto.OrdemDeServicoDTO;
import br.com.autogyn.model.OrdemDeServico;
import br.com.autogyn.service.OrdemDeServicoService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/ordens-servico")
@CrossOrigin(origins = "*")
public class OrdemDeServicoController {

    private final OrdemDeServicoService ordemService;

    public OrdemDeServicoController(OrdemDeServicoService ordemService) {
        this.ordemService = ordemService;
    }

    @GetMapping
    public ResponseEntity<List<OrdemDeServico>> listarTodas() {
        return ResponseEntity.ok(ordemService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrdemDeServico> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(ordemService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<String> criar(@Valid @RequestBody OrdemDeServicoDTO dto) {
        ordemService.criar(dto);
        return ResponseEntity.ok("Ordem de serviço criada com sucesso!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        ordemService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
