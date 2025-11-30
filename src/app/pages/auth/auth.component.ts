import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'bld-auth',
  standalone: true,
  imports: [CardModule, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {


}
