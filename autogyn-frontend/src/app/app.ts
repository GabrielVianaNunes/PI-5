// src/app/app.ts (ou app.component.ts)

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] // ✅ CORRETO com 's' no final
})
export class App {
  protected title = 'autogyn-frontend';
}
