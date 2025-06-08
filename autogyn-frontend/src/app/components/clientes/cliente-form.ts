import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, ToastModule],
  providers: [MessageService],
  template: `
    <form [formGroup]="clienteForm" (ngSubmit)="onSubmit()" class="p-fluid">
      <div class="p-field">
        <label for="nome">Nome</label>
        <input id="nome" type="text" pInputText formControlName="nome" />
      </div>

      <div class="p-field">
        <label for="tipoCliente">Tipo</label>
        <input id="tipoCliente" type="text" pInputText formControlName="tipoCliente" />
      </div>

      <div class="p-field">
        <label for="documento">Documento</label>
        <input id="documento" type="text" pInputText formControlName="documento" />
      </div>

      <div class="p-field">
        <label for="telefone">Telefone</label>
        <input id="telefone" type="text" pInputText formControlName="telefone" />
      </div>

      <div class="p-field">
        <label for="email">Email</label>
        <input id="email" type="email" pInputText formControlName="email" />
      </div>

      <div class="p-field">
        <label for="endereco">Endereço</label>
        <input id="endereco" type="text" pInputText formControlName="endereco" />
      </div>

      <button pButton type="submit" label="Salvar"></button>
    </form>
  `,
  styles: [``]
})
export class ClienteFormComponent {
  private fb = inject(FormBuilder);
  private clienteService: ClienteService = inject(ClienteService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  clienteForm: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    tipoCliente: ['', Validators.required],
    documento: ['', Validators.required],
    telefone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    endereco: ['', Validators.required]
  });

  onSubmit() {
    if (this.clienteForm.valid) {
      this.clienteService.create(this.clienteForm.value).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente cadastrado com sucesso!' });
          this.router.navigate(['/clientes']);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar cliente' });
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos obrigatórios' });
    }
  }
}
