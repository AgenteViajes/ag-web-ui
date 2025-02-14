import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

export const hasRolGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const roles = route.data?.['roles'] as string[];
  return authService.currentUser$.pipe(
    map((user) => {
      if(!user) return false;
      return roles.some( rol => user.rol === rol);
    })
  );
};
