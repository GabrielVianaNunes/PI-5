// src/app/components/veiculos/veiculo-form.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente.model';
import { MessageService } from 'primeng/api';

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-veiculo-form',
  standalone: true,
  templateUrl: './veiculo-form.component.html',
  styleUrls: ['./veiculo-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class VeiculoFormComponent {
  private fb = inject(FormBuilder);
  private veiculoService: VeiculoService = inject(VeiculoService);
  private clienteService = inject(ClienteService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  isInvalid(campo: string): boolean {
    const control = this.veiculoForm.get(campo);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }


  veiculoForm: FormGroup = this.fb.group({
    placa: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/) // Ex: ABC1D23
      ]
    ],
    marca: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/) // Apenas letras e acentos
      ]
    ],
    modelo: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9\s\-]+$/) // Letras, números, espaços e traço
      ]
    ],
    ano: [
      '',
      [
        Validators.required,
        Validators.min(1909),
        Validators.max(2026)
      ]
    ],
    tipo: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)
      ]
    ],
    clienteId: [null, Validators.required]
  });

  clientes: Cliente[] = [];

  ngOnInit() {
    this.clienteService.getAll().subscribe({
      next: (dados) => this.clientes = dados,
      error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar clientes' })
    });
  }

  onSubmit() {
    if (this.veiculoForm.valid) {
      this.veiculoService.create(this.veiculoForm.value).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Veículo cadastrado com sucesso!' });
          this.router.navigate(['/veiculos']);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar veículo' });
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos obrigatórios' });
    }
  }

  formatarPlaca(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
    this.veiculoForm.get('placa')?.setValue(input.value);
  }

}
