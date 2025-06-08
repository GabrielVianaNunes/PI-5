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
  template: `
    <p-table [value]="clientes">
      <ng-template pTemplate="header">
        <tr>
          <th>Nome</th>
          <th>Tipo</th>
          <th>Documento</th>
          <th>Telefone</th>
          <th>Endereço</th>
          <th>Ações</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-cliente>
        <tr>
          <td>{{ cliente.nome }}</td>
          <td>{{ cliente.tipoCliente }}</td>
          <td>{{ cliente.documento }}</td>
          <td>{{ cliente.telefone }}</td>
          <td>{{ cliente.endereco }}</td>
          <td>
            <button pButton type="button" icon="pi pi-pencil"
                    [routerLink]="['/clientes/editar', cliente.id]"
                    class="p-button-rounded p-button-info p-mr-2"></button>
            <button pButton type="button" icon="pi pi-trash"
                    (click)="excluir(cliente.id!)"
                    class="p-button-rounded p-button-danger"></button>
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
  styles: [``]
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

  excluir(id: number) {
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
