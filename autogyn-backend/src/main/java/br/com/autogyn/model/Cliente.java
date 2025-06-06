package br.com.autogyn.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "clientes")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotBlank(message = "Tipo de cliente é obrigatório")
    @Column(name = "tipo_cliente")
    private String tipoCliente; // FISICA ou JURIDICA

    @NotBlank(message = "Documento é obrigatório")
    @Pattern(
        regexp = "(\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2})|(\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2})",
        message = "CPF/CNPJ inválido"
    )
    private String documento; // Pode ser CPF ou CNPJ

    @NotBlank(message = "Telefone é obrigatório")
    private String telefone;

    @NotBlank(message = "Endereço é obrigatório")
    private String endereco;

    public Cliente() {
    }

    public Cliente(Long id, String nome, String tipoCliente, String documento, String telefone, String endereco) {
        this.id = id;
        this.nome = nome;
        this.tipoCliente = tipoCliente;
        this.documento = documento;
        this.telefone = telefone;
        this.endereco = endereco;
    }

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTipoCliente() {
        return tipoCliente;
    }

    public void setTipoCliente(String tipoCliente) {
        this.tipoCliente = tipoCliente;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }
}