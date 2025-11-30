import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'system',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES),
    component: AuthComponent,
    title: 'Home Page'
  },
  {
    path: 'system',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/system/system.routes').then(m => m.SYSTEM_ROUTES),
    title: 'System Page',
  },
  {
    path: '**',
    redirectTo: ''
  }
];
