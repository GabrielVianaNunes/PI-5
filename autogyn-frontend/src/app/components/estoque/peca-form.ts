import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PecaService } from 'src/app/services/peca.service';
import { ToastService } from 'src/app/services/toast.service';
import { PecaEstoque } from 'src/app/models/peca.model';

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
  private route = inject(ActivatedRoute);

  pecaForm: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    codigo: ['', [
      Validators.required,
      Validators.pattern(/^P-\d{4}$/) // Expressão Regular compatível com Autômato Finito
    ]],
    descricao: [''],
    quantidade: [0, [Validators.required, Validators.min(0)]],
    valorUnitario: [0, [Validators.required, Validators.min(0)]],
    estoqueMinimo: [0, [Validators.min(0)]]
  });

  editMode: boolean = false;
  pecaId?: number;

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editMode = true;
      this.pecaId = Number(idParam);
      this.pecaService.getById(this.pecaId).subscribe({
        next: (peca) => this.pecaForm.patchValue(peca),
        error: () => this.toast.erro('Erro ao carregar peça')
      });
    }
  }

  // ✅ Método corrigido para voltar à lista de peças
  voltar() {
    this.router.navigate(['/estoque']);
  }

  onSubmit() {
    if (this.pecaForm.invalid) {
      this.toast.aviso('Preencha todos os campos obrigatórios');
      return;
    }

    if (this.editMode && this.pecaId) {
      this.pecaService.update(this.pecaId, this.pecaForm.value).subscribe({
        next: () => {
          this.toast.sucesso('Peça atualizada com sucesso');
          this.router.navigate(['/estoque']);
        },
        error: () => this.toast.erro('Erro ao atualizar peça')
      });
    } else {
      this.pecaService.create(this.pecaForm.value).subscribe({
        next: () => {
          this.toast.sucesso('Peça cadastrada com sucesso');
          this.router.navigate(['/estoque']);
        },
        error: () => this.toast.erro('Erro ao cadastrar peça')
      });
    }
  }
}
