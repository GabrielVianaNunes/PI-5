import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './cliente-form.html',
  styleUrls: ['./cliente-form.css']
})
export class ClienteFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  clienteId: number | null = null;

  clienteForm: FormGroup = this.fb.group({
    nome: [
      '',
      [
        Validators.required,
        Validators.pattern('^[A-Za-zÀ-ÿ\\s]+$') // Apenas letras e espaços
      ]
    ],
    tipoCliente: ['', Validators.required],
    documento: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d{11}$|^\d{14}$/) // CPF (11) ou CNPJ (14)
      ]
    ],
    telefone: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d{11}$/) // Apenas números, 11 dígitos
      ]
    ],
    email: ['', [Validators.required, Validators.email]],
    endereco: ['', Validators.required]
  });

  ngOnInit(): void {
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.clienteId) {
      this.clienteService.getById(this.clienteId).subscribe((cliente) => {
        this.clienteForm.patchValue(cliente);
      });
    }
  }

  salvar() {
    if (this.clienteForm.valid) {
      const acao = this.clienteId
        ? this.clienteService.update(this.clienteId, this.clienteForm.value)
        : this.clienteService.create(this.clienteForm.value);

      acao.subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `Cliente ${this.clienteId ? 'atualizado' : 'cadastrado'} com sucesso!`
          });
          this.router.navigate(['/clientes']);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao ${this.clienteId ? 'atualizar' : 'cadastrar'} cliente`
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Preencha todos os campos obrigatórios corretamente.'
      });
      this.clienteForm.markAllAsTouched();
    }
  }

  cancelar() {
    this.router.navigate(['/clientes']);
  }

  isInvalid(campo: string): boolean {
    const control = this.clienteForm.get(campo);
    return control ? control.invalid && control.touched : false;
  }

  permitirSomenteNumeros(event: KeyboardEvent) {
    const tecla = event.key;
    if (!/^\d$/.test(tecla)) {
      event.preventDefault();
    }
  }

  voltarInicio() {
    this.router.navigate(['/']);
  }

  formatarTelefone(event: Event) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');

    if (valor.length > 11) {
      valor = valor.slice(0, 11);
    }

    if (valor.length > 6) {
      input.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
    } else if (valor.length > 2) {
      input.value = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    } else if (valor.length > 0) {
      input.value = `(${valor}`;
    }

    this.clienteForm.get('telefone')?.setValue(input.value.replace(/\D/g, ''));
  }

  formatarDocumento(event: Event) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');

    if (valor.length > 11) {
      valor = valor.slice(0, 11);
    }

    if (valor.length > 9) {
      input.value = `${valor.slice(0, 3)}.${valor.slice(3, 6)}.${valor.slice(6, 9)}-${valor.slice(9)}`;
    } else if (valor.length > 6) {
      input.value = `${valor.slice(0, 3)}.${valor.slice(3, 6)}.${valor.slice(6)}`;
    } else if (valor.length > 3) {
      input.value = `${valor.slice(0, 3)}.${valor.slice(3)}`;
    } else {
      input.value = valor;
    }

    this.clienteForm.get('documento')?.setValue(valor);
  }

}
