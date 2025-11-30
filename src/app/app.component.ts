import { Component } from '@angular/core';
import { PagesComponent } from "./pages/pages.component";

@Component({
  selector: 'bld-root',
  standalone: true,
  imports: [PagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
