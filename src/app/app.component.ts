import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PagesComponent } from "./pages/pages.component";

@Component({
  selector: 'bld-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, PagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
