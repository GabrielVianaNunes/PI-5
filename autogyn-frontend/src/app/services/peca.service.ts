// src/app/services/peca.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PecaEstoque } from '../models/peca.model'; // ou ajuste para o caminho correto
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PecaService {
  private readonly apiUrl = 'http://localhost:8095/api/pecas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PecaEstoque[]> {
    return this.http.get<PecaEstoque[]>(this.apiUrl);
  }

  getById(id: number): Observable<PecaEstoque> {
    return this.http.get<PecaEstoque>(`${this.apiUrl}/${id}`);
  }

  create(peca: PecaEstoque): Observable<PecaEstoque> {
    return this.http.post<PecaEstoque>(this.apiUrl, peca);
  }

  update(id: number, peca: PecaEstoque): Observable<PecaEstoque> {
    return this.http.put<PecaEstoque>(`${this.apiUrl}/${id}`, peca);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
