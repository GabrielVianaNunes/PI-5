import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    DropdownModule
  ],
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

  tiposCliente = [
    { label: 'Pessoa Física', value: 'FISICA' },
    { label: 'Pessoa Jurídica', value: 'JURIDICA' }
  ];

  clienteForm: FormGroup = this.fb.group({
    nome: [
      '',
      [Validators.required, Validators.pattern("^[A-Za-zÀ-ú\\s]+$")]
    ],
    tipoCliente: ['', Validators.required],
    documento: ['', Validators.required],
    telefone: [
      '',
      [Validators.required, Validators.pattern(/^[0-9]{11}$/)]
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

    this.clienteForm.get('tipoCliente')?.valueChanges.subscribe(tipo => {
      const docCtrl = this.clienteForm.get('documento');
      if (tipo === 'FISICA') {
        docCtrl?.setValidators([Validators.required, Validators.pattern(/^\d{11}$/)]);
      } else {
        docCtrl?.setValidators([Validators.required, Validators.pattern(/^\d{14}$/)]);
      }
      docCtrl?.updateValueAndValidity();
    });
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

  voltarInicio() {
    this.router.navigate(['/']);
  }

  isInvalid(campo: string): boolean {
    const control = this.clienteForm.get(campo);
    return control ? control.invalid && control.touched : false;
  }

  permitirSomenteNumeros(event: KeyboardEvent) {
    const tecla = event.key;
    if (!/^[0-9]$/.test(tecla)) {
      event.preventDefault();
    }
  }

  formatarTelefone(event: Event) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');

    if (valor.length > 11) valor = valor.slice(0, 11);

    let formatado = '';
    if (valor.length > 6) {
      formatado = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
    } else if (valor.length > 2) {
      formatado = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    } else if (valor.length > 0) {
      formatado = `(${valor}`;
    }

    input.value = formatado;
    this.clienteForm.get('telefone')?.setValue(valor);
  }

  formatarDocumento(event: Event) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');

    const tipo = this.clienteForm.get('tipoCliente')?.value;
    let formatado = '';

    if (tipo === 'FISICA') {
      if (valor.length > 11) valor = valor.slice(0, 11);
      if (valor.length > 9) {
        formatado = `${valor.slice(0, 3)}.${valor.slice(3, 6)}.${valor.slice(6, 9)}-${valor.slice(9)}`;
      } else if (valor.length > 6) {
        formatado = `${valor.slice(0, 3)}.${valor.slice(3, 6)}.${valor.slice(6)}`;
      } else if (valor.length > 3) {
        formatado = `${valor.slice(0, 3)}.${valor.slice(3)}`;
      } else {
        formatado = valor;
      }
    } else {
      if (valor.length > 14) valor = valor.slice(0, 14);
      if (valor.length > 12) {
        formatado = `${valor.slice(0, 2)}.${valor.slice(2, 5)}.${valor.slice(5, 8)}/${valor.slice(8, 12)}-${valor.slice(12)}`;
      } else if (valor.length > 8) {
        formatado = `${valor.slice(0, 2)}.${valor.slice(2, 5)}.${valor.slice(5, 8)}/${valor.slice(8)}`;
      } else if (valor.length > 5) {
        formatado = `${valor.slice(0, 2)}.${valor.slice(2, 5)}.${valor.slice(5)}`;
      } else if (valor.length > 2) {
        formatado = `${valor.slice(0, 2)}.${valor.slice(2)}`;
      } else {
        formatado = valor;
      }
    }

    input.value = formatado;
    this.clienteForm.get('documento')?.setValue(valor);
  }

  atualizarValidacaoDocumento() {
    const tipo = this.clienteForm.get('tipoCliente')?.value;
    const documentoControl = this.clienteForm.get('documento');

    if (tipo === 'JURIDICA') {
      documentoControl?.setValidators([
        Validators.required,
        Validators.pattern(/^\d{14}$/) // CNPJ: 14 dígitos numéricos
      ]);
    } else {
      documentoControl?.setValidators([
        Validators.required,
        Validators.pattern(/^\d{11}$/) // CPF: 11 dígitos numéricos
      ]);
    }

    documentoControl?.updateValueAndValidity();
  }

}
