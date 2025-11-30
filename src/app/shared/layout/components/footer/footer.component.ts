import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'bld-footer',
  standalone: true,
  imports: [CardModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
