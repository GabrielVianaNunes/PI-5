package br.com.autogyn.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import br.com.autogyn.dto.VeiculoDTO;
import br.com.autogyn.model.Cliente;
import br.com.autogyn.model.Veiculo;
import br.com.autogyn.repository.ClienteRepository;
import br.com.autogyn.repository.VeiculoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@Service
public class VeiculoService {

    private final VeiculoRepository veiculoRepository;
    private final ClienteRepository clienteRepository;

    public VeiculoService(VeiculoRepository veiculoRepository, ClienteRepository clienteRepository) {
        this.veiculoRepository = veiculoRepository;
        this.clienteRepository = clienteRepository;
    }

    public List<VeiculoDTO> listarTodos() {
        return veiculoRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public VeiculoDTO buscarPorId(Long id) {
        Veiculo veiculo = veiculoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Veículo não encontrado com ID: " + id));
        return toDTO(veiculo);
    }

    public VeiculoDTO criar(@Valid VeiculoDTO dto) {
        if (veiculoRepository.existsByPlaca(dto.getPlaca())) {
            throw new IllegalArgumentException("Já existe um veículo com a placa informada.");
        }

        Veiculo veiculo = toEntity(dto);
        return toDTO(veiculoRepository.save(veiculo));
    }

    public VeiculoDTO atualizar(Long id, @Valid VeiculoDTO dto) {
        Veiculo veiculoExistente = veiculoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Veículo não encontrado com ID: " + id));

        veiculoExistente.setPlaca(dto.getPlaca());
        veiculoExistente.setMarca(dto.getMarca());
        veiculoExistente.setModelo(dto.getModelo());
        veiculoExistente.setAno(dto.getAno());
        veiculoExistente.setTipo(dto.getTipo());

        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado com ID: " + dto.getClienteId()));

        veiculoExistente.setCliente(cliente);

        return toDTO(veiculoRepository.save(veiculoExistente));
    }

    public void deletar(Long id) {
        if (!veiculoRepository.existsById(id)) {
            throw new EntityNotFoundException("Veículo não encontrado com ID: " + id);
        }
        veiculoRepository.deleteById(id);
    }

    // Métodos auxiliares para conversão

    private VeiculoDTO toDTO(Veiculo veiculo) {
        return new VeiculoDTO(
                veiculo.getId(),
                veiculo.getPlaca(),
                veiculo.getMarca(),
                veiculo.getModelo(),
                veiculo.getAno(),
                veiculo.getTipo(),
                veiculo.getCliente().getId(),
                veiculo.getCliente().getNome()
        );
    }

    private Veiculo toEntity(VeiculoDTO dto) {
        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado com ID: " + dto.getClienteId()));

        Veiculo veiculo = new Veiculo();
        veiculo.setId(dto.getId());
        veiculo.setPlaca(dto.getPlaca());
        veiculo.setMarca(dto.getMarca());
        veiculo.setModelo(dto.getModelo());
        veiculo.setAno(dto.getAno());
        veiculo.setTipo(dto.getTipo());
        veiculo.setCliente(cliente);
        return veiculo;
    }
}
