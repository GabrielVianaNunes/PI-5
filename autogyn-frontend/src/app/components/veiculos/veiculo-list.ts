import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

import { VeiculoService } from 'src/app/services/veiculo.service';
import { ToastService } from 'src/app/services/toast.service';
import { Veiculo } from 'src/app/models/veiculo.model';

@Component({
  selector: 'app-veiculo-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.css']
})
export class VeiculoListComponent {
  veiculos: Veiculo[] = [];
  private veiculoService = inject(VeiculoService);
  private toast = inject(ToastService);

  ngOnInit() {
    this.carregarVeiculos();
  }

  carregarVeiculos() {
    this.veiculoService.getAll().subscribe({
      next: (dados) => (this.veiculos = dados),
      error: () => this.toast.erro('Erro ao buscar veículos')
    });
  }

  excluir(id?: number) {
    if (!id) return;

    if (confirm('Tem certeza que deseja excluir este veículo?')) {
      this.veiculoService.delete(id).subscribe({
        next: () => {
          this.toast.sucesso('Veículo excluído com sucesso');
          this.carregarVeiculos();
        },
        error: () => this.toast.erro('Erro ao excluir veículo')
      });
    }
  }

}
