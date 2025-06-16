// src/app/components/ordens/ordem-form.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { OrdemService } from 'src/app/services/ordem.service'; // NOVO
import { Cliente } from 'src/app/models/cliente.model';
import { Veiculo } from 'src/app/models/veiculo.model';
import { OrdemServico } from 'src/app/models/ordem.model'; // Tipagem opcional
import { MessageService } from 'primeng/api';
import { PecaService } from 'src/app/services/peca.service';
import { PecaEstoque } from 'src/app/models/peca.model';

import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

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
  private ordemService = inject(OrdemService);
  private pecaService = inject(PecaService); // ✅ NOVO
  private messageService = inject(MessageService);
  private router = inject(Router);

  ordemForm: FormGroup = this.fb.group({
    clienteId: [null, Validators.required],
    veiculoId: [null, Validators.required],
    dataAbertura: [null, Validators.required],
    dataFechamento: [null],
    status: ['ABERTA', Validators.required],
    observacoes: [''],
    itens: this.fb.array([])
  });

  clientes: Cliente[] = [];
  veiculos: Veiculo[] = [];
  pecas: PecaEstoque[] = []; // ✅ NOVO

  ngOnInit() {
    this.clienteService.getAll().subscribe({ next: c => this.clientes = c });
    this.veiculoService.getAll().subscribe({ next: v => this.veiculos = v });
    this.pecaService.getAll().subscribe({ next: p => this.pecas = p }); // ✅ NOVO
  }

  get itens(): FormArray {
    return this.ordemForm.get('itens') as FormArray;
  }

  adicionarItem() {
    const item = this.fb.group({
      descricao: ['', Validators.required],
      tipo: ['SERVICO', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      valorUnitario: [0, Validators.required],
      pecaEstoqueId: [null]
    });
    this.itens.push(item);
  }

  removerItem(index: number) {
    this.itens.removeAt(index);
  }

  onSubmit() {
    if (this.ordemForm.valid) {
      const ordem: OrdemServico = this.ordemForm.value;

      this.ordemService.create(ordem).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Ordem criada!', detail: 'Ordem de serviço registrada com sucesso.' });
          this.router.navigate(['/ordens']);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar ordem de serviço.' });
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Formulário inválido', detail: 'Preencha todos os campos obrigatórios.' });
    }
  }

  voltarParaLista() {
    this.router.navigate(['/ordens']);
  }
}
