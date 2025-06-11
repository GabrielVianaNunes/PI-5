// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { ClienteFormComponent } from './components/clientes/cliente-form';
import { ClienteListComponent } from './components/clientes/cliente-list';

import { VeiculoFormComponent } from './components/veiculos/veiculo-form';
import { VeiculoListComponent } from './components/veiculos/veiculo-list';

import { OrdemFormComponent } from './components/ordens/ordem-form';
import { OrdemListComponent } from './components/ordens/ordem-list';

import { PecaFormComponent } from './components/estoque/peca-form';
import { PecaListComponent } from './components/estoque/peca-list';

import { PagamentoFormComponent } from './components/pagamentos/pagamento-form';
import { PagamentoListComponent } from './components/pagamentos/pagamento-list';

import { HomeComponent } from './components/home/home.component';

export const appRoutes: Routes = [
  // Página inicial
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  // Clientes
  { path: 'clientes', component: ClienteListComponent },
  { path: 'clientes/novo', component: ClienteFormComponent },
  { path: 'clientes/editar/:id', component: ClienteFormComponent },

  // Veículos
  { path: 'veiculos', component: VeiculoListComponent },
  { path: 'veiculos/novo', component: VeiculoFormComponent },
  { path: 'veiculos/editar/:id', component: VeiculoFormComponent },

  // Ordens de Serviço
  { path: 'ordens', component: OrdemListComponent },
  { path: 'ordens/novo', component: OrdemFormComponent },
  { path: 'ordens/editar/:id', component: OrdemFormComponent },

  // Estoque de Peças
  { path: 'estoque', component: PecaListComponent },
  { path: 'estoque/novo', component: PecaFormComponent },
  { path: 'estoque/editar/:id', component: PecaFormComponent },

  // Pagamentos
  { path: 'pagamentos', component: PagamentoListComponent },
  { path: 'pagamentos/novo', component: PagamentoFormComponent },
  { path: 'pagamentos/editar/:id', component: PagamentoFormComponent },

  // Fallback
  { path: '**', redirectTo: 'home' }
];
