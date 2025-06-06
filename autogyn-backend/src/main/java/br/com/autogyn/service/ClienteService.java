package br.com.autogyn.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.autogyn.dto.ClienteDTO;
import br.com.autogyn.model.Cliente;
import br.com.autogyn.repository.ClienteRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    // Criar cliente
    public ClienteDTO criarCliente(ClienteDTO dto) {
        Cliente cliente = fromDTO(dto);
        cliente = clienteRepository.save(cliente);
        return toDTO(cliente);
    }

    // Listar todos os clientes
    public List<ClienteDTO> listarTodos() {
        return clienteRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Buscar cliente por ID
    public ClienteDTO buscarPorId(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado com ID: " + id));
        return toDTO(cliente);
    }

    // Atualizar cliente
    public ClienteDTO atualizarCliente(Long id, ClienteDTO dto) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado com ID: " + id));

        cliente.setNome(dto.getNome());
        cliente.setTipoCliente(dto.getTipoCliente());
        cliente.setDocumento(dto.getDocumento());
        cliente.setTelefone(dto.getTelefone());
        cliente.setEndereco(dto.getEndereco());

        return toDTO(clienteRepository.save(cliente));
    }

    // Deletar cliente
    public void deletarCliente(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado com ID: " + id));
        clienteRepository.delete(cliente);
    }

    // Conversão DTO → Entidade
    private Cliente fromDTO(ClienteDTO dto) {
        return new Cliente(
                dto.getId(),
                dto.getNome(),
                dto.getTipoCliente(),
                dto.getDocumento(),
                dto.getTelefone(),
                dto.getEndereco()
        );
    }

    // Conversão Entidade → DTO
    private ClienteDTO toDTO(Cliente cliente) {
        return new ClienteDTO(
                cliente.getId(),
                cliente.getNome(),
                cliente.getTipoCliente(),
                cliente.getDocumento(),
                cliente.getTelefone(),
                cliente.getEndereco()
        );
    }
}
