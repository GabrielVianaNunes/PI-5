// src/app/services/toast.service.ts

import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) {}

  sucesso(mensagem: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: mensagem
    });
  }

  erro(mensagem: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: mensagem
    });
  }

  aviso(mensagem: string): void {
    this.messageService.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: mensagem
    });
  }

  info(mensagem: string): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Informação',
      detail: mensagem
    });
  }
}
