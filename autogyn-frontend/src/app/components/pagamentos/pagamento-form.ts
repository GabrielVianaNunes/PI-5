import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';

import { ToastService } from 'src/app/services/toast.service';
import { PagamentoService } from 'src/app/services/pagamento.service';

@Component({
  selector: 'app-pagamento-form',
  standalone: true,
  templateUrl: './pagamento-form.html',
  styleUrls: ['./pagamento-form.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputNumberModule,
    ButtonModule,
    ToastModule,
    DialogModule
  ],
  providers: [MessageService]
})
export class PagamentoFormComponent {
  private fb = inject(FormBuilder);
  private pagamentoService = inject(PagamentoService);
  private toast = inject(ToastService);
  private router = inject(Router);

  formasPagamento = ['DINHEIRO', 'PIX', 'CARTAO_CREDITO', 'CARTAO_DEBITO'];
  statusPagamento = ['PAGO', 'PENDENTE', 'CANCELADO'];

  pagamentoForm: FormGroup = this.fb.group({
    ordemDeServicoId: [null, Validators.required],
    valorPago: [0, [Validators.required, Validators.min(0)]],
    formaPagamento: [null, Validators.required],
    status: ['PAGO', Validators.required]
  });

  carregando = false;

  // Modal
  modalVisivel = false;
  campoAtual: 'formaPagamento' | 'status' | null = null;
  opcoesModal: string[] = [];

  abrirModal(campo: 'formaPagamento' | 'status') {
    this.campoAtual = campo;
    this.opcoesModal = campo === 'formaPagamento' ? this.formasPagamento : this.statusPagamento;
    this.modalVisivel = true;
  }

  selecionarOpcao(opcao: string) {
    if (this.campoAtual) {
      this.pagamentoForm.get(this.campoAtual)?.setValue(opcao);
    }
    this.modalVisivel = false;
  }

  onSubmit() {
    if (this.pagamentoForm.valid) {
      this.carregando = true;
      this.pagamentoService.create(this.pagamentoForm.value).subscribe({
        next: () => {
          this.toast.sucesso('Pagamento registrado com sucesso!');
          this.router.navigate(['/pagamentos']);
        },
        error: () => {
          this.toast.erro('Erro ao registrar pagamento');
        },
        complete: () => {
          this.carregando = false;
        }
      });
    } else {
      this.toast.aviso('Preencha todos os campos obrigatórios');
    }
  }

  isInvalid(campo: string): boolean {
    const control = this.pagamentoForm.get(campo);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
