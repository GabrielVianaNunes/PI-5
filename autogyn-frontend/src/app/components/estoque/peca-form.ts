import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PecaService } from 'src/app/services/peca.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-peca-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule
  ],
  templateUrl: './peca-form.html',
  styleUrls: ['./peca-form.css']
})
export class PecaFormComponent {
  private fb = inject(FormBuilder);
  private pecaService = inject(PecaService);
  private toast = inject(ToastService);
  private router = inject(Router);

  pecaForm: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    codigo: ['', [
      Validators.required,
      Validators.pattern(/^P-\d{4}$/)  // Validação formal via regex
    ]],
    descricao: [''],
    quantidade: [0, [Validators.required, Validators.min(0)]],
    valorUnitario: [0, [Validators.required, Validators.min(0)]],
    estoqueMinimo: [0, [Validators.min(0)]],
    localizacao: ['']
  });

  editMode: any;

  // Método para voltar ao dashboard
  voltar() {
    this.router.navigate(['/dashboard']); // ou ['/'] se for a raiz
  }

  onSubmit() {
    if (this.pecaForm.valid) {
      this.pecaService.create(this.pecaForm.value).subscribe({
        next: () => {
          this.toast.sucesso('Peça cadastrada com sucesso');
          this.router.navigate(['/estoque']);
        },
        error: () => this.toast.erro('Erro ao cadastrar peça')
      });
    } else {
      this.toast.aviso('Preencha todos os campos obrigatórios');
    }
  }
}