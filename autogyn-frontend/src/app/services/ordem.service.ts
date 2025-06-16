// src/app/services/ordem.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrdemServico } from '../models/ordem.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdemService {
  private readonly apiUrl = 'http://localhost:8095/api/ordens-servico';

  constructor(private http: HttpClient) {}

  getAll(): Observable<OrdemServico[]> {
    return this.http.get<OrdemServico[]>(this.apiUrl);
  }

  getById(id: number): Observable<OrdemServico> {
    return this.http.get<OrdemServico>(`${this.apiUrl}/${id}`);
  }

  create(ordem: OrdemServico): Observable<OrdemServico> {
    return this.http.post<OrdemServico>(this.apiUrl, ordem);
  }

  update(id: number, ordem: OrdemServico): Observable<OrdemServico> {
    return this.http.put<OrdemServico>(`${this.apiUrl}/${id}`, ordem);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
