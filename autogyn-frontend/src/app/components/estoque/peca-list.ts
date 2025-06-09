// src/app/components/estoque/peca-list.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { PecaService } from 'src/app/services/peca.service';
import { ToastService } from 'src/app/services/toast.service';
import { PecaEstoque } from 'src/app/models/peca.model';

@Component({
  selector: 'app-peca-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, ButtonModule],
  templateUrl: './peca-list.html',
  styleUrls: ['./peca-list.css']
})
export class PecaListComponent {
  pecas: PecaEstoque[] = [];
  private pecaService = inject(PecaService);
  private toast = inject(ToastService);

  ngOnInit() {
    this.carregarPecas();
  }

  carregarPecas() {
    this.pecaService.getAll().subscribe({
      next: (dados) => (this.pecas = dados),
      error: () => this.toast.erro('Erro ao buscar peças')
    });
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir esta peça?')) {
      this.pecaService.delete(id).subscribe({
        next: () => {
          this.toast.sucesso('Peça excluída com sucesso');
          this.carregarPecas();
        },
        error: () => this.toast.erro('Erro ao excluir peça')
      });
    }
  }
}
