// src/app/components/pagamentos/pagamento-list.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { PagamentoService } from 'src/app/services/pagamento.service';
import { ToastService } from 'src/app/services/toast.service';
import { Pagamento } from 'src/app/models/pagamento.model';

@Component({
  selector: 'app-pagamento-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, ButtonModule],
  templateUrl: './pagamento-list.html',
  styleUrls: ['./pagamento-list.css']
})
export class PagamentoListComponent {
  pagamentos: Pagamento[] = [];
  private pagamentoService = inject(PagamentoService);
  private toast = inject(ToastService);

  ngOnInit() {
    this.carregarPagamentos();
  }

  carregarPagamentos() {
    this.pagamentoService.getAll().subscribe({
      next: (dados) => (this.pagamentos = dados),
      error: () => this.toast.erro('Erro ao buscar pagamentos')
    });
  }

  excluir(id?: number) {
    if (id == null) return;

    if (confirm('Tem certeza que deseja excluir este pagamento?')) {
      this.pagamentoService.delete(id).subscribe({
        next: () => {
          this.toast.sucesso('Pagamento excluído com sucesso');
          this.carregarPagamentos();
        },
        error: () => this.toast.erro('Erro ao excluir pagamento')
      });
    }
  }

}
