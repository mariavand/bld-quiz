import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { authGuard } from './shared/guards/auth.guard';
import { SystemComponent } from './pages/system/system.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'system',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES),
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
