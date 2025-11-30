import { DestroyRef, inject } from "@angular/core";
import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { map, Observable, Subject, takeUntil } from "rxjs";
import { AuthService } from "../services/auth.service";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export const authGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> | boolean=> {
  const authService = inject(AuthService);
  const router = inject(Router);
  const destroyRef = inject(DestroyRef);

  return authService.isLoggedIn$().pipe(
    takeUntilDestroyed(destroyRef),
    map(isAuthenticated => {
      if(isAuthenticated){
        return true;
      }
      else{
        return router.parseUrl('/auth');
      }
    })
  )

}

