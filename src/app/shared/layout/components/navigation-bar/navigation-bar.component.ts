import { Component, computed, inject, Signal } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'bld-navigation-bar',
  standalone: true,
  imports: [ToolbarModule, AvatarModule, ButtonModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent {

  #authService = inject(AuthService);
  #router = inject(Router);

  user = computed(() => {
    const user = localStorage.getItem('user');
    if(user){
      return JSON.parse(user);
    }
    return '';
  });

  isAuthenticated = toSignal(
    this.#authService.isLoggedIn$().pipe(
      takeUntilDestroyed(),
    )
  );

  logout(){
    this.#authService.logout();
  }

}
