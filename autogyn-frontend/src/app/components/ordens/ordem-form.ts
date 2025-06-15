// src/app/components/ordens/ordem-form.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { OrdemService } from 'src/app/services/ordem.service';
import { PecaService } from 'src/app/services/peca.service';
import { Cliente } from 'src/app/models/cliente.model';
import { Veiculo } from 'src/app/models/veiculo.model';
import { PecaEstoque } from 'src/app/models/peca.model';
import { MessageService } from 'primeng/api';

import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Textarea } from 'primeng/textarea';

@Component({
  selector: 'app-ordem-form',
  standalone: true,
  templateUrl: './ordem-form.html',
  styleUrls: ['./ordem-form.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    Textarea,
    CalendarModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class OrdemFormComponent {
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private veiculoService = inject(VeiculoService);
  private pecaService = inject(PecaService);
  private ordemService = inject(OrdemService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  ordemForm: FormGroup = this.fb.group({
    veiculoId: [null, Validators.required],
    dataAbertura: [null, Validators.required],
    dataFechamento: [null],
    status: ['ABERTA', Validators.required],
    observacoes: [''],
    itens: this.fb.array([])
  });

  clientes: Cliente[] = [];
  veiculos: Veiculo[] = [];
  pecas: PecaEstoque[] = [];
  clienteSelecionado: string | null = null;

  ngOnInit() {
    this.veiculoService.getAll().subscribe({ next: v => this.veiculos = v });
    this.clienteService.getAll().subscribe({ next: c => this.clientes = c });
    this.pecaService.getAll().subscribe({ next: p => this.pecas = p });

    this.ordemForm.get('veiculoId')?.valueChanges.subscribe(id => this.onVeiculoSelecionado(id));
  }

  get itens(): FormArray {
    return this.ordemForm.get('itens') as FormArray;
  }

  adicionarItem() {
    const item = this.fb.group({
      descricao: ['', Validators.required],
      tipo: ['SERVICO', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      valorUnitario: [0, [Validators.required, Validators.min(0)]],
      pecaEstoqueId: [null]
    });
    this.itens.push(item);
  }

  removerItem(index: number) {
    this.itens.removeAt(index);
  }

  onVeiculoSelecionado(veiculoId: number) {
    const veiculo = this.veiculos.find(v => v.id === veiculoId);
    this.clienteSelecionado = veiculo?.cliente?.nome ?? null;
  }

  onPecaSelecionada(index: number) {
    const item = this.itens.at(index);
    const pecaId = item.get('pecaEstoqueId')?.value;
    const pecaSelecionada = this.pecas.find(p => p.id === pecaId);

    if (pecaSelecionada) {
      item.patchValue({
        valorUnitario: pecaSelecionada.valorUnitario,
        quantidade: 1
      });
    }
  }

  getQuantidadeMaxima(index: number): number {
    const pecaId = this.itens.at(index).get('pecaEstoqueId')?.value;
    const peca = this.pecas.find(p => p.id === pecaId);
    return peca?.quantidade ?? 1000;
  }

  get valorTotal(): number {
    return this.itens.controls.reduce((total, item) => {
      const qtd = item.get('quantidade')?.value || 0;
      const valor = item.get('valorUnitario')?.value || 0;
      return total + (qtd * valor);
    }, 0);
  }

  onSubmit() {
    if (this.ordemForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Formulário inválido', detail: 'Preencha todos os campos obrigatórios.' });
      return;
    }

    const formValue = this.ordemForm.value;
    const ordemPayload = {
      veiculoId: formValue.veiculoId,
      dataAbertura: formValue.dataAbertura,
      dataFechamento: formValue.dataFechamento,
      status: formValue.status,
      observacoes: formValue.observacoes,
      itens: formValue.itens.map((item: any) => ({
        descricao: item.descricao,
        tipo: item.tipo,
        quantidade: item.quantidade,
        valorUnitario: item.valorUnitario,
        pecaEstoqueId: item.tipo === 'PECA' ? item.pecaEstoqueId : null
      }))
    };

    this.ordemService.create(ordemPayload).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Ordem criada!', detail: 'Ordem de serviço registrada com sucesso.' });
        this.router.navigate(['/ordens']);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao registrar a ordem de serviço.' });
      }
    });
  }

  voltarParaLista() {
    this.router.navigate(['/ordens']);
  }
}
