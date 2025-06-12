// src/app/components/clientes/cliente-list.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './cliente-list.html',
  styleUrls: ['./cliente-list.css']
})
export class ClienteListComponent {
  clientes: Cliente[] = [];
  clienteService = inject(ClienteService);
  toast = inject(ToastService);

  ngOnInit() {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clienteService.getAll().subscribe({
      next: (dados) => this.clientes = dados,
      error: () => this.toast.erro('Erro ao buscar clientes')
    });
  }

  excluir(id?: number) {
    if (id == null) return; // ou lançar erro
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clienteService.delete(id).subscribe({
        next: () => {
          this.toast.sucesso('Cliente excluído com sucesso');
          this.carregarClientes();
        },
        error: () => this.toast.erro('Erro ao excluir cliente')
      });
    }
  }

}
