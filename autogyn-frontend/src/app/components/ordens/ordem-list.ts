// src/app/components/ordens/ordem-list.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

import { OrdemService } from 'src/app/services/ordem.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-ordem-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './ordem-list.html',
  styleUrls: ['./ordem-list.css']
})
export class OrdemListComponent {
  ordens: any[] = [];

  private ordemService = inject(OrdemService);
  private toast = inject(ToastService);

  ngOnInit() {
    this.carregarOrdens();
  }

  carregarOrdens() {
    this.ordemService.getAll().subscribe({
      next: (dados) => {
        console.log('Ordens recebidas:', dados);
        this.ordens = dados;
      },
      error: () => this.toast.erro('Erro ao buscar ordens de serviço')
    });
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir esta ordem de serviço?')) {
      this.ordemService.delete(id).subscribe({
        next: () => {
          this.toast.sucesso('Ordem de serviço excluída com sucesso');
          this.carregarOrdens();
        },
        error: () => this.toast.erro('Erro ao excluir ordem de serviço')
      });
    }
  }
}
